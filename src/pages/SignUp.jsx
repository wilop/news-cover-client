import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Box, Form, Button, Notification } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import useUser from '../hooks/useUser';

const SignUp = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { addUser } = useUser();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [repectEmail, setReEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [color, setColor] = useState('grey');
    const [res, setRes] = useState('');

    const handleFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
        setColor('grey');
        setRes('');

    };

    const handleLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
        setColor('grey');
        setRes('');

    };

    const handlePhone = (event) => {
        const value = event.target.value;
        setPhone(value);
        setColor('grey');
        setRes('');

    };

    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
        setColor('grey');
        setRes('');
    };

    const handleReEmail = (event) => {
        const value = event.target.value;
        setReEmail(value);
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
        if (email === repectEmail && password === rePassword) {
            let newUser = {
                first_name: firstname,
                last_name: lastname,
                phone: phone,
                email: email,
                password: password
            };

            addUser(newUser).then((data) => {

                navigate(state?.path || "/login");
            }).catch((err) => {
                console.log(err)
                setColor('danger');
                setFirstName('');
                setLastName('');
                setPhone('');
                setEmail('');
                setReEmail('');
                setPassword('');
                setRePassword('');
                setRes('User already exist!')
            });

        } else {
            setColor('danger');
            setRes('Email does not match!')
        }
    };

    const handleReset = (event) => {
        event.preventDefault();
        setColor('grey');
        setPhone('');
        setEmail('');
        setReEmail('');
        setRes('');
        setPassword('');
        setRePassword('');
    };

    return (
        <div >
            <Header title='User Registration' />
            <br />
            <Box style={{ width: 400, margin: 'auto' }}>
                <form onSubmit={(e) => handleSubmit(e)}
                    onReset={(e) => handleReset(e)}>
                    <Form.Field>
                        <Form.Label>First Name
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="firstname"
                                    value={firstname}
                                    placeholder="firstname"
                                    onChange={(e) => handleFirstName(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Last Name
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="lastname"
                                    value={lastname}
                                    placeholder="firstname"
                                    onChange={(e) => handleLastName(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Phone number
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="phone"
                                    value={phone}
                                    placeholder="00000000"
                                    onChange={(e) => handlePhone(e)} />

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
                                    placeholder="firstname@email.com"
                                    onChange={(e) => handleEmail(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Repeat email
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="email"
                                    name="repassword"
                                    value={repectEmail}
                                    placeholder="fisrtname@email.com"
                                    onChange={(e) => handleReEmail(e)} />

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
                                    placeholder="**********"
                                    onChange={(e) => handlePassword(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Repeat password
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="password"
                                    name="rePassword"
                                    value={rePassword}
                                    placeholder="**********"
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