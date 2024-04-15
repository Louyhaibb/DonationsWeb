/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormGroup, Label, Button, Card, CardBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import logoImg from '../../assets/images/logo/logo.png';
import toast from 'react-hot-toast';
import { useLoginUserMutation } from '../../redux/api/authAPI';
import { useEffect } from 'react';
import { getHomeRouteForLoggedInUser, getUserData } from '../../utils/Utils';

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        loginUser(data);
    };

    useEffect(() => {
        if (isSuccess) {
            const user = getUserData();
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">Welcome, Our Website!</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
            navigate(getHomeRouteForLoggedInUser(user.role))
        }

        if (isError) {
            toast.error(
                <div className="d-flex align-items-center">
                    <span className="toast-title">{error.data.message}</span>
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
                            <img className="logo" src={logoImg} alt="Donate" />
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <h1 className="heading-3 form-title">Login your account</h1>
                            </div>
                        </div>

                        <Form onSubmit={handleSubmit(onSubmit)}>
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
                                    Sign In
                                </Button>
                            </div>
                            <div className="mt-4 d-flex justify-content-center">
                                <p>
                                    Not a member? Sign up as a{' '}
                                    <Link to="/donator-signup" className="primary-link">
                                        <span>Donator</span>
                                    </Link>{' '}
                                    or{' '}
                                    <Link to="/needy-signup" className="primary-link">
                                        <span>Needy</span>
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default SignIn;
