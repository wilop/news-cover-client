import { useNavigate, NavLink } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import { Navbar, Heading, Media, Image } from 'react-bulma-components'
// import logo from '../name-logo.png';
import 'bulma/css/bulma.min.css';

function Navigator() {

    const { authed, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <Navbar active color='dark'>
            <Navbar.Brand>
                <Navbar.Item >
                    <NavLink to="/home">
                        {/* <Image src={logo} alt="Qatar Logo" className="d-inline-block align-top" /> */}
                    </NavLink>
                </Navbar.Item>
                <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container align='right'>
                    <Navbar.Item hoverable={true} >
                        <Navbar.Link >
                            <Media>
                                <Media.Item >
                                    <Heading textColor='info' size={6}>
                                        {user.email !== '' ? 'Welcome' : ''}
                                    </Heading>
                                    <Heading textColor='primary' subtitle size={6}>
                                        {user.first_name !== '' ? user.first_name : ''}
                                    </Heading>
                                </Media.Item>
                            </Media>
                        </Navbar.Link>
                        <Navbar.Dropdown right boxed>
                            {authed && <Navbar.Item onClick={handleLogout}>Logout</Navbar.Item>}
                            {authed && user.role === "admin" && <NavLink to="/categories">Categories</NavLink>}
                            {authed && user.role === "user" && <NavLink to="/sources">Sources</NavLink>}

                        </Navbar.Dropdown>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>

        </Navbar>
    );

}
export default Navigator;