/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {
    Badge,
    Col,
    Container,
    Row,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardBody,
} from 'reactstrap';
import { ChevronDown, MoreVertical, Eye } from 'react-feather';
import { useGetItemsQuery } from '../../redux/api/itemAPI';

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

const statusOptions = [
    { value: 'donating', label: 'Donating' },
    { value: 'approved', label: 'Approved' },
    { value: 'declined', label: 'Declined' },
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

const DonateItems = () => {
    const navigate = useNavigate();
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Status...' });
    const [currentCondition, setCurrentCondition] = useState({ value: '', label: 'Condition...' });
    const [currentSize, setCurrentSize] = useState({ value: '', label: 'Size...' });
    const [currentColor, setCurrentColor] = useState({ value: '', label: 'Color...' });
    const queryParams = {
        status: currentStatus.value,
        condition: currentCondition.value,
        size: currentSize.value,
        color: currentColor.value,
    };
    const { data: items } = useGetItemsQuery(queryParams, { refetchOnFocus: true, refetchOnReconnect: true });

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
                        {row.status !== 'deleted' && (
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="div" className="btn btn-sm">
                                        <MoreVertical size={14} className="cursor-pointer action-btn" />
                                    </DropdownToggle>
                                    <DropdownMenu end container="body">
                                        <DropdownItem className="w-100" onClick={() => navigate(`/needy/donation-items/detail-item/${row._id}`)}>
                                            <Eye size={14} className="mr-50" />
                                            <span className="align-middle mx-2">View</span>
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

    const handleStatusChange = (data) => {
        setCurrentStatus(data || { value: '', label: 'Status...' });
    };

    const handleConditionChange = (data) => {
        setCurrentCondition(data || { value: '', label: 'Condition...' });
    };

    const handleSizeChange = (data) => {
        setCurrentSize(data || { value: '', label: 'Size...' });
    };

    const handleColorChange = (data) => {
        setCurrentColor(data || { value: '', label: 'Color...' });
    };

    return (
        <div className="main-view">
            <Container>
                <Row className="my-3">
                    <Col>
                        <h4 className="main-title">Donation Items</h4>
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <Row>
                            <Col
                                md="3"
                            >
                                <Select
                                    isClearable
                                    placeholder="Status..."
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={statusOptions}
                                    value={currentStatus}
                                    onChange={(data) => { handleStatusChange(data); }}
                                />
                            </Col>
                            <Col
                                md="3"
                            >
                                <Select
                                    isClearable
                                    placeholder="Condition..."
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={conditionOptions}
                                    value={currentCondition}
                                    onChange={(data) => { handleConditionChange(data); }}
                                />
                            </Col>
                            <Col
                                md="3"
                            >
                                <Select
                                    isClearable
                                    placeholder="Size..."
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={sizeOptions}
                                    value={currentSize}
                                    onChange={(data) => { handleSizeChange(data); }}
                                />
                            </Col>
                            <Col
                                md="3"
                            >
                                <Select
                                    isClearable
                                    placeholder="Color..."
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={colorOptions}
                                    value={currentColor}
                                    onChange={(data) => { handleColorChange(data); }}
                                />
                            </Col>
                        </Row>
                    </CardBody>
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
                </Card>
            </Container>
        </div>
    );
};

export default DonateItems;
