/* eslint-disable react-hooks/exhaustive-deps */
import { Controller, useForm } from 'react-hook-form';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Label, Row } from 'reactstrap';
import citiesData from './cities.json';
import { useEffect } from 'react';
import { getMeAPI } from '../../redux/api/getMeAPI';
import PreloadComponent from '../../components/PreloadComponent';
import { useUpdateUserMutation } from '../../redux/api/userAPI';
import { calculateProfilePercentage } from '../../utils/Utils';

const NeedyProfile = () => {
    const { data: userData, isLoading } = getMeAPI.endpoints.getMe.useQuery(null);
    const [updateUser, { isLoading: userLoading, isSuccess, error, isError }] = useUpdateUserMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm();
    
    const cityOptions = citiesData.map(city => ({
        value: city.name,
        label: city.name
    }));
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Unisex', label: 'Unisex' }
    ];
    const childrenOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ];
    const marriedOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ];
    const shirtSizeOptions = [
        { value: 'XXS', label: 'XXS' },
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'M', label: 'M' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
    ];
    const bottomSizeOptions = [
        { value: 'XXS', label: 'XXS' },
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'M', label: 'M' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
    ];
    const shoeSizeOptions = [
        { value: '38', label: '38' },
        { value: '39', label: '39' },
        { value: '40', label: '40' },
        { value: '41', label: '41' },
        { value: '42', label: '42' },
        { value: '43', label: '43' },
        { value: '44', label: '44' },
        { value: '45', label: '45' },
    ];

    useEffect(() => {
        if (userData) {
            const fields = ['firstName', 'lastName', 'email', 'age'];
            fields.forEach((field) => setValue(field, userData[field]));
            setValue('city', cityOptions.find((option) => option.value === userData.city));
            setValue('gender', genderOptions.find((option) => option.value === userData.gender));
            setValue('children', childrenOptions.find((option) => option.value === userData.children));
            setValue('married', marriedOptions.find((option) => option.value === userData.married));
            setValue('shirtSize', shirtSizeOptions.find((option) => option.value === userData.shirtSize));
            setValue('bottomSize', bottomSizeOptions.find((option) => option.value === userData.bottomSize));
            setValue('shoeSize', shoeSizeOptions.find((option) => option.value === userData.shoeSize));

            const aa = calculateProfilePercentage(userData);
            console.log(aa, '000000000000000000000')
        }
    }, [userData]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">Profile updated successfully</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
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
    }, [userLoading]);

    const onSubmit = async (data) => {
        data.city = data.city.value;
        data.gender = data.gender.value;
        data.children = data.children.value;
        data.married = data.married.value;
        data.shirtSize = data.shirtSize.value;
        data.bottomSize = data.bottomSize.value;
        data.shoeSize = data.shoeSize.value;

        await updateUser({ id: userData._id, user: data });
    }

    return (
        <div className="main-view">
            <Container>
                <Row className="my-3">
                    <Col>
                        <h4 className="main-title">Profile</h4>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <Card>
                            <CardBody>
                                {!isLoading ? (
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="m-3">
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label className="mb-0">First Name:</Label>
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
                                                    <Label className="mb-0">Last Name:</Label>
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
                                                    <Label>Email</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                        type="email"
                                                        id="email"
                                                        {...register('email', { required: true })}
                                                    />
                                                    {errors.email && <span className="text-danger"><small>Email is required.</small></span>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Age</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.age })}`}
                                                        type="age"
                                                        id="age"
                                                        {...register('age', { required: true })}
                                                    />
                                                    {errors.email && <span className="text-danger"><small>Age is required.</small></span>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Gender</Label>
                                                    <Controller
                                                        name="gender"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={genderOptions} isClearable={true} />}
                                                    />
                                                    {errors.gender && <p className="text-danger mt-1"><small>Gender is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Married</Label>
                                                    <Controller
                                                        name="married"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={marriedOptions} isClearable={true} />}
                                                    />
                                                    {errors.married && <p className="text-danger mt-1"><small>Married is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Has Children</Label>
                                                    <Controller
                                                        name="children"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={childrenOptions} isClearable={true} />}
                                                    />
                                                    {errors.children && <p className="text-danger mt-1"><small>Has Children is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>City</Label>
                                                    <Controller
                                                        name="city"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={cityOptions} isClearable={true} />}
                                                    />
                                                    {errors.city && <p className="text-danger mt-1"><small>City is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Shirt Size</Label>
                                                    <Controller
                                                        name="shirtSize"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={shirtSizeOptions} isClearable={true} />}
                                                    />
                                                    {errors.shirtSize && <p className="text-danger mt-1"><small>Shirt Size is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Bottom Size</Label>
                                                    <Controller
                                                        name="bottomSize"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={bottomSizeOptions} isClearable={true} />}
                                                    />
                                                    {errors.bottomSize && <p className="text-danger mt-1"><small>Bottom Size is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label>Shoe Size</Label>
                                                    <Controller
                                                        name="shoeSize"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => <Select {...field} options={shoeSizeOptions} isClearable={true} />}
                                                    />
                                                    {errors.shoeSize && <p className="text-danger mt-1"><small>Shoe Size is required.</small></p>}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="m-3">
                                            <Col md="12" className="d-flex justify-content-start">
                                                <Button color="orange" className="btn-block btn-sm" type="submit">
                                                    Update Profile
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                ) : (
                                    <PreloadComponent />
                                )}

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default NeedyProfile;