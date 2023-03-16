import { Hero, Heading, Container } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';

const NoPage = () => {

    return (
        <>
            <Header title="Page Not Found" />

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
