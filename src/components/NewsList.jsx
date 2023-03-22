import { useState } from 'react';

// import ShowModal from '../hooks/ShowModal'
// import Modalnews from './Modalnews'

import { Card, Media, Heading, Columns } from 'react-bulma-components'
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
                        <Card style={{ width: 300, margin: 'auto' }}>
                            <Heading textColor='primary' >
                                New:{' '}{new_.title}
                                Fecha:{' '}{new_.date}
                            </Heading>
                            <Card.Image
                                size="4by3"
                                src={new_.image}
                                alt="No picture!" />
                            <Card.Content>
                                <Media>
                                    <Media.Item>
                                        <p size={4}>{new_.short_description}</p>
                                        <Heading subtitle size={6}>
                                            {new_.category.name}
                                        </Heading>
                                    </Media.Item>
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