/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Label, Row, Spinner } from "reactstrap";
import { Controller, useForm } from 'react-hook-form';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { useCreateUserMutation } from "../../../redux/api/userAPI";

const CreateUser = () => {
    const [isProcessing, setProcessing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const navigate = useNavigate();

    const [createUser, { isLoading, isError, error, isSuccess }] = useCreateUserMutation();

    const onSubmit = async (data) => {
        data.role = data.role.value;
        await createUser(data);
    }

    useEffect(() => {
        if (isSuccess) {
            setProcessing(false);
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">User created successfully!</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
            navigate('/admin/users');
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

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'donator', label: 'Donator' },
        { value: 'needy', label: 'Needy' }
    ];

    return (
        <div className="main-view">
            <Container>
                <Row className="my-3">
                    <Col>
                        <h4 className="main-title">Create User</h4>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <Row className="p-2">
                                        <Col md="12">
                                            <Row>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="firstName">
                                                            First Name*
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            id="firstName"
                                                            name="firstName"
                                                            className={`form-control ${classnames({ 'is-invalid': errors.firstName })}`}
                                                            {...register('firstName', { required: true })}
                                                        />
                                                        {errors.firstName && <span className="text-danger"><small>Firstname is required.</small></span>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="lastName">
                                                            Lastname*
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            id="lastName"
                                                            name="lastName"
                                                            className={`form-control ${classnames({ 'is-invalid': errors.lastName })}`}
                                                            {...register('lastName', { required: true })}
                                                        />
                                                        {errors.lastName && <span className="text-danger"><small>Lastname is required.</small></span>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="email">
                                                            Email*
                                                        </Label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                            {...register('email', { required: true })}
                                                        />
                                                        {errors.email && <span className="text-danger"><small>Email is required.</small></span>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="email">
                                                            Password*
                                                        </Label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                                                            {...register('password', { required: true })}
                                                        />
                                                        {errors.password && <span className="text-danger"><small>Password is required.</small></span>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label>Role</Label>
                                                        <Controller
                                                            name="role"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => <Select {...field} options={roleOptions} isClearable={true} />}
                                                        />
                                                        {errors.role && <p className="text-danger mt-1"><small>Role is required.</small></p>}
                                                    </FormGroup>
                                                </Col>
                                    
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="p-2 my-2">
                                        <Col sm="12">
                                            <FormGroup>
                                                <Button type="submit" className="w-25" color="orange" disabled={isProcessing}>
                                                    {isProcessing && (
                                                        <div className="me-1">
                                                            <Spinner color="light" size="sm" />
                                                        </div>
                                                    )}
                                                    <span>Submit</span>
                                                </Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default CreateUser;