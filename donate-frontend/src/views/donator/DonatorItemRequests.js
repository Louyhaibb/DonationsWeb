/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
    Badge,
    Col,
    Container,
    Row,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { ChevronDown, MoreVertical, CheckCircle, XCircle } from 'react-feather';
import { useGetDonatorItemRequestsQuery, useManageStatusItemRequestMutation } from '../../redux/api/itemRequestAPI';
import PreloadComponent from '../../components/PreloadComponent';
import toast from 'react-hot-toast';

const renderStatus = (row) => {
    let color;
    switch (row.status) {
        case 'approved':
            color = 'success';
            break;

        case 'declined':
            color = 'danger';
            break;

        case 'request':
            color = 'info';
            break;

        default:
            color = 'warning';
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
    if (row.item[0]?.image) {
        return <img src={row.item[0]?.image} alt="logo" className="img-fluid" />;
    }
    return (<></>);
};

const DonatorItemRequests = () => {
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const { data: itemRequests, isLoading } = useGetDonatorItemRequestsQuery({ refetchOnFocus: true, refetchOnReconnect: true });
    const [manageStatusItemRequest, { isLoading: changeIsLoading, isError, error, isSuccess }] = useManageStatusItemRequestMutation();

    console.log(itemRequests)

    const handleManageStatus = (id, status) => {
        manageStatusItemRequest({ id: id, status: { status: status } });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(
                <div className="d-flex align-items-center">
                    <span className="toast-title">Action is successfully changed</span>
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
    }, [changeIsLoading]);

    const columns = () => [
        {
            name: '',
            selector: (row) => renderImage(row),
        },
        {
            name: 'Title',
            sortable: true,
            selector: (row) => row.item[0]?.title
        },
        {
            name: 'Condition',
            selector: (row) => `${row.item[0]?.condition}`,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row) => `${row.item[0]?.gender}`,
            sortable: true,
        },
        {
            name: 'Size',
            selector: (row) => `${row.item[0]?.size}`,
            sortable: true,
        },
        {
            name: 'Color',
            selector: (row) => `${row.item[0]?.color}`,
            sortable: true,
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
                        {row.status === 'request' && (
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="div" className="btn btn-sm">
                                        <MoreVertical size={14} className="cursor-pointer action-btn" />
                                    </DropdownToggle>
                                    <DropdownMenu end container="body">
                                        <DropdownItem className="w-100" onClick={() => handleManageStatus(row._id, 'approved')}>
                                            <CheckCircle size={14} className="mr-50" />
                                            <span className="align-middle mx-2">Approve</span>
                                        </DropdownItem>
                                        <DropdownItem className="w-100" onClick={() => handleManageStatus(row._id, 'declined')}>
                                            <XCircle size={14} className="mr-50" />
                                            <span className="align-middle mx-2">Decline</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
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
                        <h4 className="main-title">Donate Item Requests</h4>
                    </Col>
                </Row>
                <Fragment>
                    {!isLoading ? (
                        <div className="react-dataTable">
                            <DataTable
                                title="Items"
                                data={itemRequests}
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
                    ) : (
                        <PreloadComponent />
                    )}

                </Fragment>
            </Container>
        </div>
    );
};

export default DonatorItemRequests;
