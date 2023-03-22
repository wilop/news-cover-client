import { useState, useEffect } from 'react';

import { Box, Heading, Container, Image, } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import CategoryNav from '../components/CategoryNav';
import useNews from '../hooks/useNews';

const News = () => {
    const { loadNews, loadNewsByCategory } = useNews();
    const [list, setList] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        loadNews()
            .then((data) => {setList(data); console.log(data); })
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [hasChanged]);

    const handleCategoryChange = (category) => {
        loadNewsByCategory(category)
        .then((data) => { setList(data); console.log(data); })
        .catch((err) => {
            console.log(err);
            setList([])
        });
};

    return (
        <>
            <div >
                <Header title='Your unique News Cover' />
                <CategoryNav handleCategoryChange={handleCategoryChange}/>
                <div className="App">
                    <header className="App-header">
                        <div>{list.length === 0 ? <Spinner /> : <Box><NewsList news={list} /></Box>}</div>
                    </header>
                </div>
            </div>

        </>
    );
}
export default News;