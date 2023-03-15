import { Link } from 'react-router-dom';
import { Footer, Container, Content, Columns, Icon } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

const Footer_ = () => {
    return (<>
        <Footer>
            <Container>
                <Content style={{ textAlign: 'center' }}>
                    <Columns>
                        <Columns.Column>
                            <p><Link to="/news">My Cover</Link></p>
                        </Columns.Column>
                        <Columns.Column>
                            <p><Link to="#">About</Link></p>
                        </Columns.Column>
                        <Columns.Column>
                            <p><Link to="#">Help</Link></p>
                        </Columns.Column>
                    </Columns>
                </Content>
                <Content style={{ textAlign: 'center' }}>
                    <p> <Icon>
                        <i className="fas fa-copyright" />
                    </Icon><strong>My News Cover</strong>
                    </p>
                </Content>
            </Container>
        </Footer>
    </>)
};

export default Footer_;
