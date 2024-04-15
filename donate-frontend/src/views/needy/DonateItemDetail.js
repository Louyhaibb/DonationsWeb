/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useGetItemQuery } from "../../redux/api/itemAPI";
import { useEffect, useState } from "react";
import PreloadComponent from "../../components/PreloadComponent";
import { calculateProfilePercentage, getDateFormat } from "../../utils/Utils";
import { getMeAPI } from "../../redux/api/getMeAPI";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateItemRequestMutation } from "../../redux/api/itemRequestAPI";

const DonateItemDetail = () => {
    const { id } = useParams();
    const { data: item, isLoading, refetch } = useGetItemQuery(id);
    const { data: userData } = getMeAPI.endpoints.getMe.useQuery(null);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [createItemRequest, { isLoading: requestLoading, isSuccess, error, isError}] = useCreateItemRequestMutation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (item && item.status === 'approved') {
            setIsProcessing(true);
        }
    }, [item]);



    useEffect(() => {
        if (isSuccess) {
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">Item Request successfully created</span>
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
                    <span className="toast-title">{error.data.message}</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
        }
    }, [requestLoading]);

    const handleRequest = () => {
        const profilePercent = calculateProfilePercentage(userData);
        if (profilePercent !== 100) {
            setModalVisibility(!modalVisibility);
        } else {
            const data = {
                itemId: id
            }
            createItemRequest(data);
        }
    }

    return (
        <div className="main-view">
            <Container>
                {!isLoading ? (
                    <>
                        <Card>
                            <CardBody>
                                <div>
                                    <Button color="light" onClick={() => window.history.back()}>
                                        &lt; back to list
                                    </Button>
                                </div>
                                <Row className="my-3">
                                    <Col>
                                        <h4 className="main-title">{item.title}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <div className="my-1">
                                            <Button size="sm" color="orange" onClick={handleRequest} disabled={isProcessing}>
                                                Request Donation
                                            </Button>
                                        </div>
                                        <div className="autor-infor">
                                            <div className="author-title">
                                                {item.createBy?.firstName} {item.createBy?.lastName}
                                            </div>
                                        </div>
                                        <div className="last-updated-on">
                                            <span className="auth-label">
                                                <small>Created on: </small>
                                            </span>
                                            <span className="view" title="createdAt">{getDateFormat(item.createdAt)}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Gender: </small>
                                            </span>
                                            <span className="view" title="createdAt">{item.gender}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Color: </small>
                                            </span>
                                            <span className="view" title="createdAt">{item.color}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Size: </small>
                                            </span>
                                            <span className="view" title="createdAt">{item.size}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Condtion: </small>
                                            </span>
                                            <span className="view" title="createdAt">{item.condition}</span>
                                        </div>
                                        <div className="my-1">
                                            <img src={item.image} className="item-img" alt="Donate" />
                                        </div>
                                        <div className="info-details">
                                            <article className="my-3">
                                                <p>{item.description}</p>
                                            </article>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                    </>
                ) : (
                    <PreloadComponent />
                )}

                <Modal isOpen={modalVisibility} toggle={() => setModalVisibility(!modalVisibility)} className="modal-dialog-centered">
                    <ModalHeader toggle={() => setModalVisibility(!modalVisibility)}>Profile Warning</ModalHeader>
                    <ModalBody>Did you complete your profile? Please Complete your profile.</ModalBody>
                    <ModalFooter className="justify-content-start">
                        <Button color="orange" onClick={() => navigate('/needy/profile')}>
                            Yes
                        </Button>
                        <Button color="secondary" onClick={() => setModalVisibility(!modalVisibility)} outline>
                            No
                        </Button>
                    </ModalFooter>
                </Modal>

            </Container>
        </div>
    )
};

export default DonateItemDetail;