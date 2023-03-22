import { useState, useEffect } from 'react';

import { Box } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import CategoryNav from '../components/CategoryNav';
import useNews from '../hooks/useNews';

const News = () => {
    const { loadNews } = useNews();
    const [list, setList] = useState([]);
    const [category, setCategory] = useState('All');

    useEffect(() => {
        loadNews(category)
            .then((data) => {
                setList(data); console.log(data);
            })
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [category]);

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleAllNews = () => {
        setCategory('All');
    };

    const newsList = (
        list.length ? <Box><NewsList news={list} /></Box> : <Spinner />);

    return (
        <>
            <Header title='Your unique News Cover' />
            <CategoryNav handleCategoryChange={handleCategoryChange} handleAllNews={handleAllNews} />
            {newsList}
        </>
    );
}
export default News;