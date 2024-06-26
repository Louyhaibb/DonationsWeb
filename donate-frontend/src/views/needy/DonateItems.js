/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {
    Badge,
    Col,
    Container,
    Row,
    Card,
    CardBody,
    Button,
} from 'reactstrap';
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
    const [visibleProductCount, setVisibleProductCount] = useState(8);
    const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Status...' });
    const [currentCondition, setCurrentCondition] = useState({ value: '', label: 'Condition...' });
    const [currentSize, setCurrentSize] = useState({ value: '', label: 'Size...' });
    const [currentColor, setCurrentColor] = useState({ value: '', label: 'Color...' });
    const [itemList, setItemList] = useState([]);
    const queryParams = {
        status: currentStatus.value,
        condition: currentCondition.value,
        size: currentSize.value,
        color: currentColor.value,
    };
    const { data: items, refetch } = useGetItemsQuery(queryParams, { refetchOnFocus: true, refetchOnReconnect: true });
    console.log(items)

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (items) {
            setItemList(items);
        }
    }, [items]);

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

                </Card>
                <Row className='mt-4'>
                    {
                        itemList.length > 0 ? (
                            <>
                                {itemList.slice(0, visibleProductCount).map((item, index) => (
                                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4 d-flex">
                                        <div className="item-card overflow-hidden flex-fill d-flex flex-column">
                                            <Link to={`/needy/donation-items/detail-item/${item._id}`}>
                                                <div className="a-section a-spacing-base flex-fill d-flex flex-column">
                                                    <div className="aok-relative text-center s-image-overlay-grey puis-image-overlay-grey s-padding-left-small s-padding-right-small puis-spacing-small" style={{ paddingTop: "0px !important" }}>
                                                        <div className="a-section aok-relative s-image-square-aspect">
                                                            <img className="s-image" src={item.image} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex-grow-1 d-flex flex-column">
                                                        <div className="product-content flex-fill">
                                                            <h5 className="text-center item-title" style={{ fontWeight: 'bold' }}>{item.title}</h5>
                                                            <p className="text-center item-description">
                                                                {item.description.length > 120 ? `${item.description.substring(0, 100)}...` : item.description}
                                                            </p>
                                                            <div className="text-center my-1 product-price" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                                                                <span style={{ fontSize: '0.95rem' }}>Gender: {item.gender}</span>
                                                            </div>
                                                            <div className="text-center my-1 product-price" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                                                                <span style={{ fontSize: '0.95rem' }}>Size: {item.size}</span>
                                                            </div>
                                                            <div className="text-center my-1 product-price" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                                                                <span style={{ fontSize: '0.95rem' }}>Color: {item.color}</span>
                                                            </div>
                                                            <div className="text-center my-1 product-price" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                                                                <span style={{ fontSize: '0.95rem' }}>Condtion: {item.condition}</span>
                                                            </div>
                                                            <div className="text-center my-1 product-stock">
                                                                {renderStatus(item)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    </Col>
                                ))}
                                {itemList.length > visibleProductCount && (
                                    <div className="my-3 d-flex justify-content-center">
                                        <Button
                                            color='primary'
                                            size='sm'
                                            className="my-2"
                                            onClick={() => setVisibleProductCount(visibleProductCount + 8)}
                                        >
                                            Load More
                                        </Button>
                                    </div>

                                )}
                            </>
                        ) : (
                            <Col xs={12} className="text-center">
                                <p>No items found.</p>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </div>
    );
};

export default DonateItems;
