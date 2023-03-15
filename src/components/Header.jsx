import { Hero, Container, Heading } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

const Header = (props) => {
    return (
        <>
            <Hero color="dark" size="medium">
                <Hero.Body>
                    <Container>
                        <Heading size={1}>My News Cover</Heading>
                    </Container>
                    <Container>
                        <Heading subtitle size={3}>{props.title}</Heading>
                    </Container>
                </Hero.Body>
            </Hero>
        </>
    );
};

export default Header;