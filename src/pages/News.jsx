import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';
import CategoryNav from '../components/CategoryNav';
import useNews from '../hooks/useNews';
import useSource from '../hooks/useSource';

const News = () => {
    const { loadNews } = useNews();
    const navigate = useNavigate();
    const { userHasSource } = useSource();
    const [list, setList] = useState([]);
    const [category, setCategory] = useState('All');
    const [hasSource, setHasSource] = useState(false);

    const goToSource = () => {
        // if (!list.length && hasSource === false) {
        //     let state_ = { state: { source: { _id: '', name: '', url: '', category: { name: '' } }, edit: false } };
        //     navigate('/source', state_);
        // }
    }


    var setTime = setTimeout(goToSource, 10000);


    useEffect(() => {
        loadNews(category)
            .then((data) => {
                setList(data);
                setHasSource(true);
                clearTimeout(setTime);

            })
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [category]);


    // useEffect(() => {
    //     if (list.length === 0 && !hasSource) {
    //         setTime;
    //     }
    // }, []);


    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleAllNews = () => {
        setCategory('All');
    };

    const newsList = (
        list.length ? <Box><NewsList news={list} onLoad={()=>clearTimeout(setTime)}/></Box> : <Spinner onLoad={() => setTime} className='Spinner' ></Spinner>);

    return (
        <>
            <Header title='Your unique News Cover' />
            <CategoryNav handleCategoryChange={handleCategoryChange} handleAllNews={handleAllNews} />
            <div className="App" >
                <header className="App-header">
                    <div>{newsList}</div>
                </header>
            </div>
        </>
    );
}
export default News;