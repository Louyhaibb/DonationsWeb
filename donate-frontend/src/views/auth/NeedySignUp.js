/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormGroup, Label, Button, Card, CardBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import logoImg from '../../assets/images/logo/logo.png';
import { useRegisterUserMutation } from '../../redux/api/authAPI';
import { isObjEmpty } from '../../utils/Utils';

const NeedySignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 👇 Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      data.role = 'needy';
      registerUser(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        <div className="d-flex align-items-center">
          <span className="toast-title">User registered successfully</span>
        </div>,
        {
          duration: 2000,
          position: 'top-right'
        }
      );
      navigate('/sign-in');
    }

    if (isError) {
      toast.error(
        <div className="d-flex align-items-center">
          <span className="toast-title">{error.data}</span>
        </div>,
        {
          duration: 2000,
          position: 'top-right'
        }
      );
    }
  }, [isLoading]);

  return (
    <div className="auth-wrapper auth-v1 px-2 auth-background">
      <div className="auth-inner py-2">
        <Card className="mb-0">
          <CardBody>
            <div className="mb-4 d-flex justify-content-center">
              <img className="logo" src={logoImg} alt="SmartSitter" />
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <p className="body-meta">
                  Looking for care?{' '}
                  <Link to="/donator-signup" className="primary-link">
                    <span className="fw-bold">
                      <small>Sign up as a Donator →</small>
                    </span>
                  </Link>
                </p>
                <h1 className="heading-3 form-title">Needy, create your account</h1>
              </div>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>First Name</Label>
                <input
                  className={`form-control ${classnames({ 'is-invalid': errors.firstName })}`}
                  type="text"
                  id="firstName"
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && <span className="text-danger"><small>Firstname is required.</small></span>}
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <input
                  className={`form-control ${classnames({ 'is-invalid': errors.lastName })}`}
                  type="text"
                  id="lastName"
                  {...register('lastName', { required: true })}
                />
                {errors.lastName && <span className="text-danger"><small>Lastname is required.</small></span>}
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <input
                  className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                  type="email"
                  id="email"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-danger"><small>Email is required.</small></span>}
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <input
                  className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                  type="password"
                  id="password"
                  {...register('password', { required: true })}
                />
                {errors.password && <span className="text-danger"><small>Password is required.</small></span>}
              </FormGroup>
              <div className="mt-4">
                <Button color="orange" className="btn-block w-100" type="submit">
                  SIGN UP
                </Button>
              </div>
            </Form>
            <div className="my-3 body-2 md-vertical-spacing">
              Already have an account?{' '}
              <Link to="/sign-in" className="primary-link">
                <span className="fw-bold">
                  Sign In
                </span>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default NeedySignUp;

