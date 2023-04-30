import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Panel, Form, Tag, Content } from 'react-bulma-components'
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
    const [query, setQuery] = useState('all');
    const [hasSource, setHasSource] = useState(false);
    const [param, setParam] = useState('');
    const [filter, setFilter] = useState('');
    const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState([]);

    const goToSource = () => {
        // if (!list.length && hasSource === false) {
        //     let state_ = { state: { source: { _id: '', name: '', url: '', category: { name: '' } }, edit: false } };
        //     navigate('/source', state_);
        // }
    }


    var setTime = setTimeout(goToSource, 10000);


    useEffect(() => {
        loadNews(query, param)
            .then((data) => {
                setList(data);
                setHasSource(true);
                clearTimeout(setTime);

            })
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [query, param]);


    const handleCategoryChange = (category) => {
        setQuery("category");
        setParam(category);
        setFilter('');
        setTags([]);
        populateTags();
    };

    const handleAllNews = () => {
        setQuery('all');
        setParam('');
        setFilter('');
        setTags([]);
        populateTags();
    };

    const handleFilter = (e) => {
        const value = e.target.value;
        e.target.
            setQuery('keyword');
        setFilter(value);
        setParam(value);
        populateTags();
        setTags([]);
    };

    const handleAllTags = (e, index) => {
        e.preventDefault();
        let tags_ = tags;
        tags_.push(allTags[index]);
        setTags(tags_);
        setAllTags(allTags.filter(item => item !== allTags[index]))
        setQuery('tags');
        setFilter("");
        setParam(tags);
    };

    const handleTags = (e, index) => {
        e.preventDefault();
        let tags_ = allTags;
        tags_.push(tags[index]);
        setAllTags(tags_);
        setTags(tags.filter(item => item !== tags[index]));
        setQuery('tags');
        setFilter("");
        setParam(tags);
    };

    const populateTags = () => {
        if (list.length) {
            let tags_ = [];
            list.map((new_) => {
                if (new_.tags.length) {
                    new_.tags.map((tag) => {
                        if (!tags_.includes(tag)) {
                            tags_.push(tag);
                        }
                    });
                }
            });
            setAllTags(tags_);
        }
    };

    const newsList = (
        list.length ? <Box><NewsList news={list} onLoad={() => clearTimeout(setTime)} /></Box> : <Spinner onLoad={() => setTime} className='Spinner' ></Spinner>);


    return (
        <>
            <Header title='Your unique News Cover' />
            <CategoryNav handleCategoryChange={handleCategoryChange} handleAllNews={handleAllNews} />
            <Panel color='info'>
                <Panel.Header> Filter by
                    <Form.Control>
                        <Form.Input
                            type="text"
                            name="filter"
                            value={filter}
                            placeholder="Search"
                            onChange={(e) => handleFilter(e)} />
                    </Form.Control>
                </Panel.Header>
                <Content >
                    {allTags.length && allTags.map((tag, index) => (

                        < Tag clickable='true' color='warning' mr='1' key={index} onClick={(e) => handleAllTags(e, index)}>{tag}</Tag>
                    ))}
                </Content>
                <Content>
                    {tags.length && tags.map((tag, index) => (

                        < Tag clickable='true' color='success' mr='1' key={index} onClick={(e) => handleTags(e, index)}>{tag}</Tag>
                    ))}
                </Content>
            </Panel>
            <div className="App" >
                <header className="App-header">
                    <div>{newsList}</div>
                </header>
            </div>
        </>
    );
}
export default News;