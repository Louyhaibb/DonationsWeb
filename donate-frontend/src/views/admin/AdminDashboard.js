import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { useGetAdminDashboardsQuery } from "../../redux/api/dashboardAPI";
import PreloadComponent from "../../components/PreloadComponent";

const AdminDashboard = () => {
    const { data: adminData, isLoading } = useGetAdminDashboardsQuery();
    console.log(adminData);
    return (
        <div className="main-view">
            <Container>
                {!isLoading ? (
                    <Row>
                        <Col md="3">
                            <Card className="mini-stat bg-primary">
                                <CardBody className="mini-stat-img">
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Users</h6>
                                        <h2 className="mb-4 text-white">{adminData.users}</h2>
                                        <span className="badge bg-info"> All Our Members </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card className="mini-stat bg-success">
                                <CardBody className="mini-stat-img">
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Donations</h6>
                                        <h2 className="mb-4 text-white">{adminData.donations}</h2>
                                        <span className="badge bg-info"> All Our Donations </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card className="mini-stat bg-danger">
                                <CardBody className="mini-stat-img">
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Requested Donations</h6>
                                        <h2 className="mb-4 text-white">{adminData.requestedDonations}</h2>
                                        <span className="badge bg-info"> All Requested Donations </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card className="mini-stat bg-secondary">
                                <CardBody className="mini-stat-img">
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">Approved Donations</h6>
                                        <h2 className="mb-4 text-white">{adminData.approvedDonations}</h2>
                                        <span className="badge bg-info"> All approved donations </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <PreloadComponent />
                )}

            </Container>
        </div>
    )
};

export default AdminDashboard;