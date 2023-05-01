import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Hero, Heading, Container } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';

const PasswordlessLoginCallback = () => {
  const navigate = useNavigate();
  const { verifyEmailToken } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getTokenFromURL = () => {
    let params = new URLSearchParams(document.location.search);
    let token = params.get("pwd");
    let email = params.get("email");
    console.log(email, token);
    return {token, email};
  };

  useEffect(() => {
    const session = getTokenFromURL();
    verifyEmailToken(session.token, session.email)
      .then(() => {
        setIsLoggedIn(true)
        navigate('/news');
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner className='Spinner' ></Spinner>;
  }

  return (

    <>
      <Header title="Passwordless Verification" />

      <Hero color='warning' >
        <Hero.Body >
          <Container >
            <center>
              {isLoggedIn ? (
                <Heading>Welcome</Heading>
              ) : (
                <Heading>Something wrong happened</Heading>
              )}
            </center>
          </Container>
        </Hero.Body>
      </Hero>

    </>

  );
};

export default PasswordlessLoginCallback;
