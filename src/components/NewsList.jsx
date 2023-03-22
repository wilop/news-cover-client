import { useState } from 'react';

// import ShowModal from '../hooks/ShowModal'
// import Modalnews from './Modalnews'

import { Card, Media, Heading, Columns, Content } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

const NewsList = (props) => {

    const [news] = useState(props.news);
    // const { isShowing, toggle } = ShowModal();
    console.log('news2', news);

    return (

        <>
            {news.length && (<Columns>
                {news.map((new_, index) => (
                    <Columns.Column key={index}>
                        <Card style={{ width: 600, margin: 'auto' }}>
                            <Heading textColor='primary' >
                                <p><a href={new_.permalink} target="_blank">New:{' '}{new_.title}</a></p>
                                <p>Fecha:{' '}{new_.date}</p> 
                            </Heading>
                            <Card.Content>
                                <Media>
                                    <Content>
                                        <p size={4}>{new_.short_description}</p>
                                        <Heading subtitle size={6}>
                                            {new_.category.name}
                                        </Heading>
                                    </Content>
                                </Media>
                            </Card.Content>
                            

                        </Card>
                    </Columns.Column>
                ))}
            </Columns>)
            }
        </>
    );

}

export default NewsList;