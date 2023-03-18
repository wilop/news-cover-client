import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Box, Form, Button, Notification } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';

function SignUp() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [user, setUser] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [color, setColor] = useState('grey');
    const [res, setRes] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": username,
                "email": email,
                "password": password,
                "passwordConfirm": repassword,
            }),
            redirect: 'follow',
        })
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [user]);

    const register = () => {
        setUser(!user);
        try {
            if (data.status === "success") {
                navigate(state?.path || "/login");
                setRes('Gooolll!');

            } else {
                setRes('Fault!');
            }
        } catch (error) {
            setRes('Fault!')
        }

        setColor('danger');
        setUsername('');
        setEmail('');
        setPassword('');
        setRePassword('');
        setRes('Fault!')

    }

    const handleUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
        setColor('grey');
        setRes('');

    };

    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
        setColor('grey');
        setRes('');
    };

    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
        setColor('grey');
        setRes('');
    };

    const handleRePassword = (event) => {
        const value = event.target.value;
        setRePassword(value);
        setColor('grey');
        setRes('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        register();
    };

    const handleReset = (event) => {
        event.preventDefault();
        setColor('grey');
        setEmail('');
        setPassword('');
        setRes('');
    };

    return (
        <div >
            <Header title='User Registration'/>
            <br />
            <Box style={{ width: 400, margin: 'auto' }}>
                <form onSubmit={(e) => handleSubmit(e)}
                    onReset={(e) => handleReset(e)}>
                    <Form.Field>
                        <Form.Label>UserName
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="username"
                                    onChange={(e) => handleUsername(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Email
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="username@email.com"
                                    onChange={(e) => handleEmail(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Password
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="*************"
                                    onChange={(e) => handlePassword(e)} />
                            </Form.Control>
                        </Form.Label>

                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Repeact Password
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="password"
                                    name="repassword"
                                    value={repassword}
                                    placeholder="*************"
                                    onChange={(e) => handleRePassword(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>

                    <Form.Field kind='group'>
                        <Form.Label pr={5} >Already an User?
                        </Form.Label>
                        <Link to="/login">Login Here</Link>
                    </Form.Field>

                    <Form.Field kind="group">
                        <Form.Control>
                            <Button value="Reset" color="dark" colorVariant='light' type="reset">Cancel</Button>
                        </Form.Control>
                        <Form.Control>
                            <Button value="Login" color="dark" type="submit">Register</Button>

                        </Form.Control>
                    </Form.Field>
                </form>
                <br />
                <Notification color={color}>
                    <strong>{res}</strong>
                </Notification>
            </Box>
        </div>
    );
}
export default SignUp;