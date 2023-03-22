import { useNavigate, NavLink } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import { Navbar, Heading, Media } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

function Navigator() {

    const { authed, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate("/login");
    };


    return (
        <Navbar active color='dark'>
            <Navbar.Menu>
                <Navbar.Container align='right'>
                    <Navbar.Item hoverable={true} >
                        <Navbar.Link >
                            <Media>
                                <Media.Item >
                                    <Heading textcolor='info' size={6}>
                                        {user.email !== '' ? 'Welcome' : ''}
                                    </Heading>
                                    <Heading textcolor='primary' subtitle size={6}>
                                        {user.first_name !== '' ? user.first_name : ''}
                                    </Heading>
                                </Media.Item>
                            </Media>
                        </Navbar.Link>
                        {authed && <Navbar.Dropdown right boxed>
                            <Navbar.Item>
                                <NavLink to="/news">My Cover</NavLink>
                            </Navbar.Item>
                            <Navbar.Item>
                                <NavLink to="/sources">Sources</NavLink>
                            </Navbar.Item>
                            {user.role === "admin" && <Navbar.Item>
                                <NavLink to="/categories">Categories</NavLink>
                            </Navbar.Item>}

                            <Navbar.Item onClick={(e)=>handleLogout(e)}>Logout</Navbar.Item>

                        </Navbar.Dropdown>}
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>

        </Navbar>
    );

}
export default Navigator;