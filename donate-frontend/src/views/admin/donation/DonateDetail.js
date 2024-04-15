/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useGetItemQuery } from "../../../redux/api/itemAPI";
import { useEffect, useState } from "react";
import PreloadComponent from "../../../components/PreloadComponent";
import { getDateFormat } from "../../../utils/Utils";
import { useNavigate } from 'react-router-dom';

const DonateDetail = () => {
    const { id } = useParams();
    const { data: item, isLoading, refetch } = useGetItemQuery(id);
    const [modalVisibility, setModalVisibility] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className="main-view">
            <Container>
                {!isLoading ? (
                    <>
                        <Card>
                            <CardBody className="mx-3">
                                <div>
                                    <Button color="light" onClick={() => window.history.back()}>
                                        &lt; back to list
                                    </Button>
                                </div>
                                <Row className="mt-3">
                                    <Col>
                                        <h4 className="main-title">{item.title}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <div className="autor-infor">
                                            <div className="author-title">
                                                Donator: {item.createBy?.firstName} {item.createBy?.lastName}
                                            </div>
                                        </div>
                                        <div className="last-updated-on">
                                            <span className="auth-label">
                                                <small>Created on: </small>
                                            </span>
                                            <span className="view" title="createdAt">{getDateFormat(item.createdAt)}</span>
                                        </div>
                                        <div className="last-updated-on">
                                            <span className="auth-label">
                                                <small>Approved on: </small>
                                            </span>
                                            <span className="view" title="requestAt">{getDateFormat(item.updatedAt)}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Needy: </small>
                                            </span>
                                            <span className="view" title="Needy"><small>Anonymous</small></span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Gender: </small>
                                            </span>
                                            <span className="view" title="Gender">{item.gender}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Color: </small>
                                            </span>
                                            <span className="view" title="Color">{item.color}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Size: </small>
                                            </span>
                                            <span className="view" title="Size">{item.size}</span>
                                        </div>
                                        <div className="my-1">
                                            <span className="auth-label">
                                                <small>Condtion: </small>
                                            </span>
                                            <span className="view" title="Condtion">{item.condition}</span>
                                        </div>
                                        {item.image && (
                                            <div className="my-2">
                                                <img src={item.image} className="item-img" alt="Donate" />
                                            </div>
                                        )}

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

export default DonateDetail;