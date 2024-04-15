/* eslint-disable react-hooks/exhaustive-deps */
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
import { ChevronDown, MoreVertical, Eye } from 'react-feather';
import { useGetItemsQuery } from '../../../redux/api/itemAPI';

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

const DonateList = () => {
    const navigate = useNavigate();
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const filterParams = {
        status: 'approved'
    }
    const { data: items } = useGetItemsQuery(filterParams, { refetchOnFocus: true, refetchOnReconnect: true });

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
                        <UncontrolledDropdown>
                            <DropdownToggle tag="div" className="btn btn-sm">
                                <MoreVertical size={14} className="cursor-pointer action-btn" />
                            </DropdownToggle>
                            <DropdownMenu end container="body">
                                <DropdownItem className="w-100" onClick={() => navigate(`/admin/donations/detail/${row._id}`)}>
                                    <Eye size={14} className="mr-50" />
                                    <span className="align-middle mx-2">View</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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
                        <h4 className="main-title">Donation Items</h4>
                    </Col>
                </Row>

                <div className="react-dataTable">
                    <DataTable
                        title="Donations"
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
            </Container>
        </div>
    );
};

export default DonateList;
