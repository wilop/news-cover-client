import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, Button, Form, Notification, Panel } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const Login = () => {

  const navigate = useNavigate();
  const { login, sendLoginEmail, getOtp, verifyOtp } = useAuth();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [color, setColor] = useState('grey');
  const [passwordTab, setPasswordTab] = useState(true);
  const [phoneTab, setPhoneTab] = useState(false);
  const [codeTab, setCodeTab] = useState(false);
  const [passwordlessTab, setPassworldlessTab] = useState(false);

  const [res, setRes] = useState('');

  const login_ = () => {

    setEmail('');
    setPassword('');

    login(email, password).then((session) => {
      setPasswordTab(false);
      setPassworldlessTab(false);
      setPhoneTab(true);
      // navigate(state?.path || '/news');
      // setRes('Welcome!');
    }).catch(() => {
      setRes('Wrong email or password!');
      setColor('danger');

    });
  };

  const sendLoginEmail_ = () => {

    setEmail('');
    setPassword('');
    setOtp('');

    sendLoginEmail(email).then(() => {
      navigate(state?.path || '/news');
      setRes('Welcome!');
    }).catch(() => {
      setRes('Wrong email!');
      setColor('danger');

    });
  };

  const getOtp_ = () => {

    setEmail('');
    setPassword('');
    setOtp('');
    setPasswordTab(false);
    setPassworldlessTab(false);
    setPhoneTab(false);
    setCodeTab(true);
    getOtp(phone).then(() => {
    }).catch(() => {
      setRes('Wrong telephone');
      setColor('danger');

    });
  };

  const verifyOtp_ = () => {

    setEmail('');
    setPassword('');
    setOtp('');

    verifyOtp(phone, otp).then((session) => {
      navigate(state?.path || '/news');
      setRes('Welcome!');
    }).catch(() => {
      setRes('Wrong telephone or code expired!');
      setColor('danger');

    });
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setColor('grey');
    setRes('');
  };

  const handlePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
    setColor('grey');
    setRes('');
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    setColor('grey');
    setRes('');
  };

  const handleOtp = (event) => {
    const value = event.target.value;
    setOtp(value);
    setColor('grey');
    setRes('');
  };

  const handlePasswordTab = () => {
    setPasswordTab(true);
    setPassworldlessTab(false);
    setPhoneTab(false);
    setCodeTab(false);
  };

  const handlePhoneTab = () => {
    setPasswordTab(false);
    setPassworldlessTab(false);
    setPhoneTab(true);
    setCodeTab(false);
  };

  const handlePasswordlessTab = () => {
    setPasswordTab(false);
    setPassworldlessTab(true);
    setPhoneTab(false);
    setCodeTab(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login_();
    setRes('');
  };

  const submitEmail = (event) => {
    event.preventDefault();
    sendLoginEmail_()
    setRes('');
  };

  const submitPhone = (event) => {
    event.preventDefault();
    getOtp_();
    setRes('');
  };

  const submitOtp = (event) => {
    event.preventDefault();
    verifyOtp_();
    setRes('');
  };


  const handleReset = (event) => {
    event.preventDefault();
    setColor('grey');
    setEmail('');
    setPassword('');
    setOtp('');
    setRes('');
  };

  return (
    <div>
      <Header title="User Login" />
      <br />
      <Box style={{ width: 400, margin: 'auto' }}>
        <form onSubmit={(e) => handleSubmit(e)}
          onReset={(e) => handleReset(e)}>

          <Panel alignItems='flex-start'>
            <Panel.Header>
              Authentication method
            </Panel.Header>

            <Panel.Tabs>
              <Panel.Tabs.Tab active={passwordTab} onClick={handlePasswordTab}>
                Password
              </Panel.Tabs.Tab >
              <Panel.Tabs.Tab active={phoneTab} onClick={handlePhoneTab} display='hidden'>
                OTP Code
              </Panel.Tabs.Tab>
              <Panel.Tabs.Tab active={passwordlessTab} onClick={handlePasswordlessTab}>
                Passwordless
              </Panel.Tabs.Tab>
            </Panel.Tabs>
            <Panel.Block invisible={!passwordTab} display={!passwordTab ? 'hidden' : 'block'}>
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
                <Form.Control>
                  <Button value="Login" color="dark" type="submit">Login</Button>
                </Form.Control>
              </Form.Field>
            </Panel.Block>

            <Panel.Block invisible={!phoneTab} display={!phoneTab ? 'hidden' : 'block'}>
              <Form.Field>
                <Form.Label>Phone
                  <Form.Control>
                    <Form.Input color={color} textColor={color}
                      type="text"
                      name="phone"
                      value={phone}
                      placeholder="506XXXXXXXX"
                      onChange={(e) => handlePhone(e)} />

                  </Form.Control>
                </Form.Label>
                <Form.Control>
                  <Button value="get_code" color="dark" type="button" onClick={(e) => submitPhone(e)}>Get Code</Button>
                </Form.Control>
              </Form.Field>
            </Panel.Block>
            <Panel.Block invisible={!codeTab} display={!codeTab ? 'hidden' : 'block'}>
              <Form.Field>
                <Form.Label>OTP Code
                  <Form.Control>
                    <Form.Input color={color} textColor={color}
                      type="text"
                      name="otp"
                      value={otp}
                      placeholder="XXXXXX"
                      onChange={(e) => handleOtp(e)} />

                  </Form.Control>
                </Form.Label>
                <Form.Control>
                  <Button value="verify_otp" color="dark" type="button" onClick={(e) => submitOtp(e)}>Verify</Button>
                </Form.Control>
              </Form.Field>
            </Panel.Block>

            <Panel.Block invisible={!passwordlessTab} display={!passwordlessTab ? 'hidden' : 'block'}  >
              <Form.Field>
                <Form.Label>Email
                  <Form.Control>
                    <Form.Input color={color} textColor={color}
                      type="text"
                      name="email2"
                      value={email}
                      placeholder="username@email.com"
                      onChange={(e) => handleEmail(e)} />

                  </Form.Control>
                </Form.Label>
                <Form.Control>
                  <Button value="passwordless" color="dark" type="button" onClick={(e) => submitEmail(e)}>Send an email</Button>
                </Form.Control>
              </Form.Field>
            </Panel.Block>

          </Panel>

          <Form.Field kind='group'>
            <Form.Label pr={5} >Not an User?
            </Form.Label>
            <Link to="/signup">Register Here</Link>
          </Form.Field>

          <Form.Field>
            <Form.Control>
              <Button value="Reset" color="dark" colorVariant='light' type="reset">Cancel</Button>
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
