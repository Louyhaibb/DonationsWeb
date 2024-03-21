/* eslint-disable no-unused-vars */
import { Card, CardBody, Col, Row } from 'reactstrap';
import logoImg from '../assets/images/logo/logo.png';

const SignUp = () => {
  return (
    <div className="auth-wrapper auth-v1 px-2 auth-background">
      <div className="auth-inner py-2">
        <Card className="mb-0">
          <CardBody>
            <div className="mb-4 d-flex justify-content-center">
              <img className="logo" src={logoImg} alt="Donate" />
            </div>

            <div className="row">
              <div className="col-12">
                <h1 className="heading-3 form-title">I am going to be a ...</h1>
              </div>
            </div>
            <Row className="my-3">
              <Col md="6" sm="12">
                <a href="/donator-signup">
                  <div className="register-type">Donator</div>
                </a>
              </Col>
              <Col md="6" sm="12">
                <a href="/needy-signup">
                  <div className="register-type">Needy</div>
                </a>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
