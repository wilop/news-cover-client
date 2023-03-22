import { useState, useEffect } from 'react';

import { Image, Notification, Heading, Columns, Tag, Content, Button } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

const NewsList = (props) => {

    const [news, setNews] = useState(props.news);

    useEffect(() => {
        setNews(props.news);
    }, [props.news]);

    return (

        <>
            {news.length && (<Columns size='half'>
                {news.map((new_, index) => (
                    <Columns.Column size={4} key={index} >
                        <Notification color='info' light style={{height: 600}}>
                            <Tag color='info'>{'Date:'} {new_.date.replace('T', ' Hour: ').replace('000Z', '')}</Tag>
                            <a href={new_.permalink} target='_blank' style={{ textDecoration: 'none' }} >
                                <Heading subtitle >
                                    {new_.title}
                                </Heading>
                            </a>
                            <a href={new_.permalink} target='_blank' style={{ textDecoration: 'none' }}>
                                <Image
                                    size="96"
                                    src={new_.image.split(' ')[3].replace('src="', '').replace('"', '')}
                                    alt="No picture!" />
                            </a>
                            <Content size='small'>
                                {new_.short_description.substring(0, 195).concat('[...]')}
                            </Content>
                            <Tag color='info'>
                                {new_.category.name}
                            </Tag>
                            <Content>
                                <a href={new_.permalink} target='_blank'>
                                    See more...
                                </a>
                            </Content>
                        </Notification>
                    </Columns.Column>
                ))}
            </Columns>)
            }
        </>
    );

}

export default NewsList;