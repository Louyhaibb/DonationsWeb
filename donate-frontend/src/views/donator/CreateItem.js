/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Label, Row, Spinner } from "reactstrap";
import { Controller, useForm } from 'react-hook-form';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useCreateItemMutation, useUploadItemImageMutation } from "../../redux/api/itemAPI";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const CreateItem = () => {
    const [isProcessing, setProcessing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const acceptedImageFormats = 'image/jpeg, image/png, image/jpg, image/svg+xml';

    const [createItem, { isLoading, isError, error, isSuccess }] = useCreateItemMutation();
    const [uploadItemImage] = useUploadItemImageMutation();

    const onSubmit = async (data) => {
        data.image = image;
        data.condition = data.condition.value;
        data.gender = data.gender.value;
        data.size = data.size.value;
        data.color = data.color.value;
        await createItem(data);
    }

    const handleControlledDropzoneChangeStatus = (file, status, allFiles) => {
        setTimeout(async () => {
            if (status === 'done') {
                const result = await uploadItemImage(allFiles[0].file);
                setImage(result.data.imageUri);
            } else {
                setImage('');
            }
        }, 0);
    };

    useEffect(() => {
        if (isSuccess) {
            setProcessing(false);
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">Item created successfully!</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
            navigate('/donator/items');
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

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Unisex', label: 'Unisex' }
    ];

    const conditionOptions = [
        { value: 'New', label: 'New' },
        { value: 'Like New', label: 'Like New' },
        { value: 'Used', label: 'Used' },
        { value: 'Bad Condition', label: 'Bad Condition' }
    ];

    const sizeOptions = [
        { value: 'XXS', label: 'XXS' },
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'M', label: 'M' },
        { value: 'XL', label: 'XL' },
        { value: 'XXL', label: 'XXL' },
        { value: '38', label: '38' },
        { value: '39', label: '39' },
        { value: '40', label: '40' },
        { value: '41', label: '41' },
        { value: '42', label: '42' },
        { value: '43', label: '43' },
        { value: '44', label: '44' },
        { value: '45', label: '45' },
    ];

    const colorOptions = [
        { value: 'Red', label: 'Red' },
        { value: 'Black', label: 'Black' },
        { value: 'Blue', label: 'Blue' },
        { value: 'Yellow', label: 'Yellow' }
    ];

    return (
        <div className="main-view">
            <Container>
                <Row className="my-3">
                    <Col>
                        <h4 className="main-title">Create Item</h4>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <Row className="p-2">
                                        <Col md="8">
                                            <Row>
                                                <Col md="12" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="title">
                                                            Title*
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            className={`form-control ${classnames({ 'is-invalid': errors.title })}`}
                                                            {...register('title', { required: true })}
                                                        />
                                                        {errors.title && <span className="text-danger"><small>Title is required.</small></span>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12" sm="12">
                                                    <FormGroup>
                                                        <Label className="form-label" for="description">
                                                            Description*
                                                        </Label>
                                                        <textarea
                                                            type="text"
                                                            id="description"
                                                            name="description"
                                                            rows={6}
                                                            className={`form-control ${classnames({ 'is-invalid': errors.description })}`}
                                                            {...register('description', { required: true })}
                                                        />
                                                        {errors.description && <span className="text-danger"><small>Description is required.</small></span>}
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
                                                        <Label>Condtion</Label>
                                                        <Controller
                                                            name="condition"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => <Select {...field} options={conditionOptions} isClearable={true} />}
                                                        />
                                                        {errors.condition && <p className="text-danger mt-1"><small>Condition is required.</small></p>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label>Size</Label>
                                                        <Controller
                                                            name="size"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => <Select {...field} options={sizeOptions} isClearable={true} />}
                                                        />
                                                        {errors.size && <p className="text-danger mt-1"><small>Size is required.</small></p>}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6" sm="12">
                                                    <FormGroup>
                                                        <Label>Color</Label>
                                                        <Controller
                                                            name="color"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field }) => <Select {...field} options={colorOptions} isClearable={true} />}
                                                        />
                                                        {errors.color && <p className="text-danger mt-1"><small>Color is required.</small></p>}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>
                                                    Image
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name="image"
                                                    render={({ onChange }) => (
                                                        <Dropzone
                                                            accept={acceptedImageFormats}
                                                            multiple={false}
                                                            maxFiles={1}
                                                            maxSizeBytes={(1024 * 1024) * 2} // 2MB
                                                            inputContent={(files, extra) => (extra.reject ? `Only ${acceptedImageFormats} allowed` : 'Drop image here or click to browse')}
                                                            styles={{
                                                                dropzoneReject: { borderColor: '#F19373 !important', backgroundColor: '#F1BDAB' },
                                                                inputLabel: (files, extra) => (extra.reject ? { color: '#A02800 !important' } : {}),
                                                            }}
                                                            onChangeStatus={(file, status, allFiles) => {
                                                                handleControlledDropzoneChangeStatus(file, status, allFiles, onChange);
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="p-2 my-2">
                                        <Col sm="12">
                                            <FormGroup className="d-flex justify-content-center">
                                                <Button type="submit" className="w-25 d-flex align-items-center justify-content-center" color="orange" disabled={isProcessing}>
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

export default CreateItem;