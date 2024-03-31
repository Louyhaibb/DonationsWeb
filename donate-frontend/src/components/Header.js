import { useEffect, useState } from 'react';
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
import { isUserLoggedIn } from '../utils/Utils';
import logoImg from '../assets/images/logo/logo.png';
import userImg from '../assets/images/user.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/api/userSlice';
import { LogOut, User } from 'react-feather';

const Header = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = isUserLoggedIn();

    const currentRoute = location.pathname;

    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, []);

    return (
        <header>
            <div className="container-fluid">
                <Navbar expand="md">
                    <NavbarBrand
                        href={
                            isLoggedIn ? (userData?.role === 'admin' ? '/admin/dashboard' : userData?.role === 'donator' ? '/donator/dashboard' : '/needy/dashboard') : '/'
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
                                        <NavLink className={`${currentRoute.includes('sign-in') ? 'active' : ''}`} onClick={() => navigate('/sign-in')}>
                                            Sign In
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={`${currentRoute.includes('sign-up') ? 'active' : ''}`} onClick={() => navigate('/sign-up')}>
                                            Sign Up
                                        </NavLink>
                                    </NavItem>
                                </>
                            )}
                            {isLoggedIn && userData?.role === 'admin' && (
                                <>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={currentRoute.includes('admin/dashboard') ? 'active' : ''} onClick={() => navigate('/admin/dashboard')}>
                                            Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={currentRoute.includes('admin/users') ? 'active' : ''} onClick={() => navigate('/admin/users')}>
                                            Users
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret onClick={e => e.preventDefault()}>
                                            <img src={userData.avatar ? userData.avatar : userImg} alt="user" className="user-img" />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem tag={Link} onClick={() => dispatch(logout())}>
                                                <LogOut size={14} className="mr-50" />
                                                <span className="align-middle mx-2">Log out</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                            )}
                            {isLoggedIn && userData?.role === 'donator' && (
                                <>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={currentRoute.includes('donator/dashboard') ? 'active' : ''} onClick={() => navigate('/donator/dashboard')}>
                                            Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={currentRoute.includes('donator/items') ? 'active' : ''} onClick={() => navigate('/donator/items')}>
                                            Items
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret onClick={e => e.preventDefault()}>
                                            <img src={userData.avatar ? userData.avatar : userImg} alt="user" className="user-img" />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem tag={Link} onClick={() => dispatch(logout())}>
                                                <LogOut size={14} className="mr-50" />
                                                <span className="align-middle mx-2">Log out</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                            )}
                            {isLoggedIn && userData?.role === 'needy' && (
                                <>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={currentRoute.includes('needy/dashboard') ? 'active' : ''} onClick={() => navigate('/needy/dashboard')}>
                                            Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="nav-item-responsive">
                                        <NavLink className={currentRoute.includes('needy/donation-items') ? 'active' : ''} onClick={() => navigate('/needy/donation-items')}>
                                            Donation Items
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret onClick={e => e.preventDefault()}>
                                            <img src={userData.avatar ? userData.avatar : userImg} alt="user" className="user-img" />
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem tag={Link} to="/needy/profile">
                                                <User size={14} className="mr-50" />
                                                <span className="align-middle mx-2">Profile</span>
                                            </DropdownItem>
                                            <DropdownItem tag={Link} onClick={() => dispatch(logout())}>
                                                <LogOut size={14} className="mr-50" />
                                                <span className="align-middle mx-2">Log out</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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