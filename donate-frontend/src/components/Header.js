import { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { getToken, isUserLoggedIn } from '../utils/Utils';
import { useAppSelector } from '../redux/store';
import logoImg from '../assets/images/logo/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const user = useAppSelector((state) => state.userState.user);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = isUserLoggedIn();

    const currentRoute = location.pathname;

    return (
        <header>
            <div>
                <Navbar expand="md">
                    <NavbarBrand
                        href={
                            isLoggedIn ? (user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'donator' ? '/donator/dashboard' : '/needy/dashboard') : '/'
                        }>
                        <img
                            src={logoImg}
                            alt="Donate"
                            className="logo-image"
                        />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className="ms-auto" />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            {!isLoggedIn && (
                                <>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={`px-2 ${currentRoute.includes('sign-in') ? 'active' : ''} border`} onClick={() => navigate('/sign-in')}>
                                            Sign In
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={`px-2 ${currentRoute.includes('sign-up') ? 'active' : ''}`} onClick={() => navigate('/sign-up')}>
                                            Sign Up
                                        </NavLink>
                                    </NavItem>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header;