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
import { ChevronDown, MoreVertical, Trash2, Edit } from 'react-feather';
import toast from 'react-hot-toast';
import { useDeleteItemMutation, useGetItemsQuery } from '../../redux/api/itemAPI';

const renderStatus = (row) => {
    let color;
    switch (row.status) {
        case 'approved':
            color = 'success';
            break;

        case 'donating':
            color = 'warning';
            break;

        case 'deleted':
            color = 'danger';
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

const renderImage = (row) => {
    if (row.image) {
        return <img src={row.image} alt="logo" className="img-fluid" />;
    }
    return (<></>);
};

const ItemList = () => {
    const navigate = useNavigate();
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const { data: items } = useGetItemsQuery({ refetchOnFocus: true, refetchOnReconnect: true });

    const [modalVisibility, setModalVisibility] = useState(false);
    const [deleteItem, { isLoading, isError, error, isSuccess }] = useDeleteItemMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">Item deleted successfully</span>
                </div>,
                {
                    duration: 2000,
                    position: 'top-right'
                }
            );
            navigate('/donator/items');
        }
        if (isError) {
            toast.error(error.data.message, {
                position: 'top-right'
            });
        }
    }, [isLoading]);

    const handleDeleteItem = async (id) => {
        await deleteItem(id);
        setModalVisibility(false);
    };

    const columns = () => [
        {
            name: '',
            selector: (row) => renderImage(row),
        },
        {
            name: 'Title',
            sortable: true,
            cell: ({ title }) => title,
            selector: (row) => row.title
        },
        {
            name: 'Description',
            selector: (row) => `${row.description}`,
            sortable: true,
            cell: ({ description }) => {
                if (description.length > 100) {
                    return `${description.substring(0, 100)}...`;
                } else {
                    return description;
                }
            }
        },
        {
            name: 'Condition',
            selector: (row) => `${row.condition}`,
            sortable: true,
            cell: ({ condition }) => condition
        },
        {
            name: 'Gender',
            selector: (row) => `${row.gender}`,
            sortable: true,
            cell: ({ gender }) => gender
        },
        {
            name: 'Size',
            selector: (row) => `${row.size}`,
            sortable: true,
            cell: ({ size }) => size
        },
        {
            name: 'Color',
            selector: (row) => `${row.color}`,
            sortable: true,
            cell: ({ color }) => color
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
                        {row.status === 'donating' && (
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="div" className="btn btn-sm">
                                        <MoreVertical size={14} className="cursor-pointer action-btn" />
                                    </DropdownToggle>
                                    <DropdownMenu end container="body">
                                        <DropdownItem className="w-100" onClick={() => navigate(`/donator/items/update-item/${row._id}`)}>
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
                        <h4 className="main-title">Items</h4>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col md="4">
                        <Button size="sm" color="orange" onClick={() => navigate('/donator/items/create-item')}>
                            Create Item
                        </Button>
                    </Col>
                </Row>
                <Fragment>
                    <div className="react-dataTable">
                        <DataTable
                            title="Items"
                            data={items}
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

export default ItemList;
