import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import { Box, Button, Form, Notification } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('grey');

  const [res, setRes] = useState('');

  const login_ = async () => {

    setColor('danger');
    setEmail('');
    setPassword('');

    login(email, password).then(() => {
      setRes('Goooolll!');
      navigate(state?.path || "/teams");
    }).catch(() => { setRes('Fault!') });
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    login_();
    setRes('');
  };

  const handleReset = (event) => {
    event.preventDefault();
    setColor('grey');
    setEmail('');
    setPassword('');
    setRes('');
  };

  return (
    <div>
      <br />
      <Box style={{ width: 400, margin: 'auto' }}>
        <form onSubmit={(e) => handleSubmit(e)}
          onReset={(e) => handleReset(e)}>
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

          <Form.Field kind='group'>
            <Form.Label pr={5} >Not an User?
            </Form.Label>
            <Link to="/signup">Register Here</Link>
          </Form.Field>

          <Form.Field kind="group">
            <Form.Control>
              <Button value="Reset" color="primary" colorVariant='light' type="reset">Cancel</Button>
            </Form.Control>
            <Form.Control>
              <Button value="Login" color="primary" type="submit">Login</Button>
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

export default Login;
