/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import {
    Badge,
    Col,
    Container,
    Row,
} from 'reactstrap';
import { ChevronDown } from 'react-feather';
import { useGetNeedyItemRequestsQuery } from '../../redux/api/itemRequestAPI';
import PreloadComponent from '../../components/PreloadComponent';

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
    if (row.item?.image) {
        return <img src={row.item?.image} alt="logo" className="img-fluid" />;
    }
    return (<></>);
};

const DonateItemRequests = () => {
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const { data: itemRequests, isLoading } = useGetNeedyItemRequestsQuery({ refetchOnFocus: true, refetchOnReconnect: true });

    console.log(itemRequests)

    const columns = () => [
        {
            name: '',
            selector: (row) => renderImage(row),
        },
        {
            name: 'Title',
            sortable: true,
            selector: (row) => row.item?.title
        },
        {
            name: 'Condition',
            selector: (row) => `${row.item?.condition}`,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row) => `${row.item?.gender}`,
            sortable: true,
        },
        {
            name: 'Size',
            selector: (row) => `${row.item?.size}`,
            sortable: true,
        },
        {
            name: 'Color',
            selector: (row) => `${row.item?.color}`,
            sortable: true,
        },
        {
            name: 'Status',
            cell: (row) => renderStatus(row)
        },
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

export default DonateItemRequests;
