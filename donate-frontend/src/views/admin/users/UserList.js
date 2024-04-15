/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
    Badge,
    Button,
    Col,
    Container,
    Row,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { ChevronDown, MoreVertical, Trash2, Edit, CheckCircle, XCircle } from 'react-feather';
import toast from 'react-hot-toast';
import { useDeleteUserMutation, useGetUsersQuery, useManageStatusUserMutation } from '../../../redux/api/userAPI';

const renderStatus = (row) => {
    let color;
    switch (row.status) {
        case 'active':
            color = 'success';
            break;

        case 'pending':
            color = 'warning';
            break;

        case 'deleted':
            color = 'danger';
            break;

        case 'declined':
            color = 'secondary';
            break;

        default:
            color = 'primary';
            break;
    }
    return (
        <span className="text-truncate text-capitalize align-middle">
            <Badge color={color} pill>
                {row.status}
            </Badge>
        </span>
    );
};

const renderRole = (row) => (
    <span className="text-truncate text-capitalize align-middle">
        <Badge color="orange" className="px-2 py-1" pill>
            {row.role}
        </Badge>
    </span>
);

const UserList = () => {
    const navigate = useNavigate();
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const { data: users } = useGetUsersQuery({ refetchOnFocus: true, refetchOnReconnect: true });
    const [manageStatusUser] = useManageStatusUserMutation();

    const [modalVisibility, setModalVisibility] = useState(false);
    const [deleteUser, { isLoading, isError, error, isSuccess }] = useDeleteUserMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">User deleted successfully</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
            navigate('/admin/users');
        }
        if (isError) {
            toast.error(error.data.message, {
                position: 'top-right'
            });
        }
    }, [isLoading]);

    const handleDeleteItem = async (id) => {
        await deleteUser(id);
        setModalVisibility(false);
    };

    const handleManageStatus = (id, status) => {
        manageStatusUser({ id: id, status: { status: status } });
    };

    const columns = () => [
        {
            name: 'Firstname',
            sortable: true,
            cell: ({ firstName }) => firstName,
            selector: (row) => row.firstName
        },
        {
            name: 'Lastname',
            sortable: true,
            cell: ({ lastName }) => lastName,
            selector: (row) => row.lastName
        },
        {
            name: 'Email',
            sortable: true,
            cell: ({ email }) => email,
            selector: (row) => row.email
        },
        {
            name: 'Role',
            cell: (row) => renderRole(row)
        },
        {
            name: 'Status',
            cell: (row) => renderStatus(row)
        },
        {
            name: 'Actions',
            minwidth: '120px',
            cell: (row) => {
                return (
                    <>
                        {row.role !== 'admin' && (
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="div" className="btn btn-sm">
                                        <MoreVertical size={14} className="cursor-pointer action-btn" />
                                    </DropdownToggle>
                                    <DropdownMenu end container="body">
                                        {row.status === 'pending' && (
                                            <>
                                                <DropdownItem className="w-100" onClick={() => handleManageStatus(row._id, 'active')}>
                                                    <CheckCircle size={14} className="mr-50" />
                                                    <span className="align-middle mx-2">Approve</span>
                                                </DropdownItem><DropdownItem className="w-100" onClick={() => handleManageStatus(row._id, 'declined')}>
                                                    <XCircle size={14} className="mr-50" />
                                                    <span className="align-middle mx-2">Decline</span>
                                                </DropdownItem>
                                            </>
                                        )}

                                        <DropdownItem className="w-100" onClick={() => navigate(`/admin/users/update-user/${row._id}`)}>
                                            <Edit size={14} className="mr-50" />
                                            <span className="align-middle mx-2">Update</span>
                                        </DropdownItem>
                                        <DropdownItem className="w-100" onClick={() => setModalVisibility(!modalVisibility)}>
                                            <Trash2 size={14} className="mr-50" />
                                            <span className="align-middle mx-2">Delete</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <Modal isOpen={modalVisibility} toggle={() => setModalVisibility(!modalVisibility)}>
                                    <ModalHeader toggle={() => setModalVisibility(!modalVisibility)}>Confirm Delete?</ModalHeader>
                                    <ModalBody>Are you sure you want to delete?</ModalBody>
                                    <ModalFooter className="justify-content-start">
                                        <Button color="danger" onClick={() => handleDeleteItem(row._id)}>
                                            Yes
                                        </Button>
                                        <Button color="secondary" onClick={() => setModalVisibility(!modalVisibility)} outline>
                                            No
                                        </Button>
                                    </ModalFooter>
                                </Modal>
                            </>
                        )}
                    </>
                );
            }
        }
    ];

    return (
        <div className="main-view">
            <Container>
                <Row className="my-3">
                    <Col>
                        <h4 className="main-title">Users</h4>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col md="4">
                        <Button size="sm" color="orange" onClick={() => navigate('/admin/users/create-user')}>
                            Create User
                        </Button>
                    </Col>
                </Row>
                <Fragment>
                    <div className="react-dataTable">
                        <DataTable
                            title="Users"
                            data={users}
                            responsive
                            className="react-dataTable"
                            noHeader
                            pagination
                            paginationServer
                            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                            columns={columns()}
                            sortIcon={<ChevronDown />}
                        />
                    </div>
                </Fragment>
            </Container>
        </div>
    );
};

export default UserList;
