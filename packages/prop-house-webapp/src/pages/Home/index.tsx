import classes from './Home.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import alien from '../../assets/files/alien.png';

const Home = () => {
  return (
    <>
      <Container>
        <Row className={classes.alienRow}>
          <Col md={12} className={classes.alienImgCol}>
            <img src={alien} alt="" />
          </Col>
          <Row>
            <Col lg={12} className={classes.cont}>
              <div className={classes.title}>Prop House had a good ride</div>
              <div className={classes.subtitle}>
                We sunset the app in May 2024. Thank you to everyone who supported us <br />
                over the years. You can read more about the decision{' '}
                <a
                  href="https://mirror.xyz/0xd8EF18493b795970a986E6D00CC451f0D6A9B17A/tmgZJiD3JeOaul-N-8_ImtxtM2UJT4HPtq_XJCIkhj0"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  here
                </a>
                .
              </div>
            </Col>
            <Col lg={12}></Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Home;
