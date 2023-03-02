import 'bulma/css/bulma.min.css';
import {Hero, Heading, Container } from 'react-bulma-components';

const NoPage = () => {
    return (
        <>
            <Hero color='warning' >
                <Hero.Body >
                    <Container >
                        <center>
                            <Heading >
                                404 Page Not Found
                            </Heading>
                        </center>
                    </Container>
                </Hero.Body>
            </Hero>

        </>
    );
}

export default NoPage;
