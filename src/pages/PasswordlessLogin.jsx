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
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const loginToken = params.token;
    return loginToken;
  };

  useEffect(() => {
    const token = getTokenFromURL();
    verifyEmailToken(token)
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
      <Header title="Page Not Found" />

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
