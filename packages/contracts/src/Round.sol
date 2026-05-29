// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@solady/tokens/ERC721.sol";
import {ERC1155} from "@solady/tokens/ERC1155.sol";
import {AssetController} from "./AssetController.sol";

contract Round is ERC721, ERC1155 {
    using AssetController for AssetController.Asset;

    address public house;
    string public title;
    address public manager;

    enum Status { Active, Finalized, Cancelled }
    Status public status;

    uint254 public totalDeposited;
    mapping(address => uint256) public depositTotals;

    event Deposited(address indexed depositor, AssetController.Asset asset);
    event Reclaimed(address indexed claimant, AssetController.Asset asset);
    event Finalized();
    event Cancelled();

    modifier onlyManager() {
        require(msg.sender == manager, "NOT_MANAGER");
        _;
    }

    modifier onlyHouseContract() {
        require(msg.sender == house, "NOT_HOUSE");
        _;
    }

    constructor(
        address _house,
        string memory _title,
        address _manager
    ) ERC1155("lilrounds://receipt") {
        house = _house;
        title = _title;
        manager = _manager;
        status = Status.Active;
    }

    function depositETH() external payable onlyHouseContract {
        require(status == Status.Active, "NOT_ACTIVE");
        require(msg.value > 0, "ZERO_AMOUNT");

        totalDeposited += msg.value;
        depositTotals[msg.sender] += msg.value;

        uint256 receiptId = _getETHReceiptId();
        _mint(msg.sender, receiptId, msg.value);

        emit Deposited(msg.sender, AssetController.Asset(address(0), address(0), msg.value));
    }

    function depositERC20(
        address token,
        uint256 amount
    ) external onlyHouseContract {
        require(status == Status.Active, "NOT_ACTIVE");
        require(amount > 0, "ZERO_AMOUNT");
        require(token != address(0), "INVALID_TOKEN");

        ERC20(token).transferFrom(msg.sender, address(this), amount);

        totalDeposited += amount;
        depositTotals[msg.sender] += amount;

        uint256 receiptId = _getTokenReceiptId(token);
        _mint(msg.sender, receiptId, amount);

        emit Deposited(msg.sender, AssetController.Asset(address(0), token, amount));
    }

    function reclaimETH(uint256 amount) external {
        require(status != Status.Active, "STILL_ACTIVE");
        uint256 receiptId = _getETHReceiptId();
        require(balanceOf(msg.sender, receiptId) >= amount, "INSUFFICIENT_RECEIPTS");

        _burn(msg.sender, receiptId, amount);
        depositTotals[msg.sender] -= amount;
        totalDeposited -= amount;

        payable(msg.sender).transfer(amount);

        emit Reclaimed(msg.sender, AssetController.Asset(address(0), address(0), amount));
    }

    function reclaimERC20(
        address token,
        uint256 amount
    ) external {
        require(status != Status.Active, "STILL_ACTIVE");
        uint256 receiptId = _getTokenReceiptId(token);
        require(balanceOf(msg.sender, receiptId) >= amount, "INSUFFICIENT_RECEIPTS");

        _burn(msg.sender, receiptId, amount);
        depositTotals[msg.sender] -= amount;
        totalDeposited -= amount;

        ERC20(token).transfer(msg.sender, amount);

        emit Reclaimed(msg.sender, AssetController.Asset(address(0), token, amount));
    }

    function finalize() external onlyManager {
        require(status == Status.Active, "NOT_ACTIVE");
        status = Status.Finalized;
        emit Finalized();
    }

    function cancel() external onlyManager {
        require(status == Status.Active, "NOT_ACTIVE");
        status = Status.Cancelled;
        emit Cancelled();
    }

    function transferManagement(address newManager) external onlyManager {
        require(newManager != address(0), "INVALID_MANAGER");
        manager = newManager;
    }

    function _getETHReceiptId() internal pure returns (uint256) {
        return 0;
    }

    function _getTokenReceiptId(address token) internal pure returns (uint256) {
        return uint160(token);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC1155) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || ERC1155.supportsInterface(interfaceId);
    }
}
