import { useNavigate, NavLink } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import { Navbar, Heading, Media, Image } from 'react-bulma-components'
// import logo from '../name-logo.png';
import 'bulma/css/bulma.min.css';

function Navigator() {

    const { authed,admin, logout, email } = useAuth();
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
                                        {email !== '' ? 'Welcome' : ''}
                                    </Heading>
                                    <Heading textColor='primary' subtitle size={6}>
                                        {email !== '' ? email : ''}
                                    </Heading>
                                </Media.Item>
                            </Media>
                        </Navbar.Link>
                        <Navbar.Dropdown >
                            {authed && <Navbar.Item onClick={handleLogout}>Logout</Navbar.Item>}
                            {authed && !admin && <NavLink to="/sources">Sources</NavLink>}
                            {authed && admin && <NavLink to="/categories">Categories</NavLink>}

                        </Navbar.Dropdown>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>

        </Navbar>
    );

}
export default Navigator;