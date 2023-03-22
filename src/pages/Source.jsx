import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Form, Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import useSource from '../hooks/useSource'
import useCategory from '../hooks/useCategory'
import Header from '../components/Header';

const Source = () => {
    const { editSource, addSource } = useSource();
    const { loadCategories } = useCategory();
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = useState('');
    const [list, setList] = useState([]);
    const [edit] = useState(location.state.edit);
    const [source, setSource] = useState(location.state.source);
    const [category, setCategory] = useState(source.category);
    const [name, setName] = useState(source.name);
    const [rssUrl, setRssUrl] = useState(source.url);

    useEffect(() => {
        loadCategories()
            .then((data) => setList(data))
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, []);

    const handleName = (event) => {
        let value = event.target.value;
        setName(value);
        setColor('grey');
    };

    const handleCategory = (index) => {
        if (index > -1 && list !== undefined) {
            let cat = list[index];
            console.log('cat',cat);
            setCategory(cat);
            setColor('grey');
        }
    };

    const handleRssUrl = (event) => {
        let value = event.target.value;
        setRssUrl(value);
        setColor('grey');
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (edit) {

            let oldSource = {
                _id: source._id,
                name: name,
                url: rssUrl,
                category: { name: category.name }
            };

            editSource(oldSource)
                .then((data) => {
                    navigate('/sources');

                }).catch((err) => {
                    console.log(err)
                    setColor('danger');
                });
        } else {
            let newSource = {
                name: name,
                url: rssUrl,
                category: { name: category.name }
            }
            addSource(newSource)
                .then((data) => {
                    navigate('/sources');

                }).catch((err) => {
                    console.log(err)
                    setColor('danger');
                });
        }
    };


    const handleReset = (event) => {
        event.preventDefault();
        setColor('grey');
        setName('');
        setCategory('');
        setRssUrl('');
    };

    return (
        <>
            <Header title={edit ? 'Editing source' : 'Adding new source'} />

            <Box style={{ width: 400, margin: 'auto' }}>
                <form onSubmit={(e) => handleSubmit(e)}
                    onReset={(e) => handleReset(e)}>
                    <Form.Field>
                        <Form.Label>Name
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={(e) => handleName(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>RSS URL
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="rss_url"
                                    value={rssUrl}
                                    placeholder="RSS URL"
                                    onChange={(e) => handleRssUrl(e)} />

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Category
                            <Form.Control>
                                <Form.Select>
                                    <option> Select a category</option>
                                    {list.map((category, index) => (<option key={index} value={category} onClick={(e) => handleCategory(index)} >{category.name}</option>))}
                                </Form.Select>

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <Button value="Save" color="dark" type="submit">Save</Button>
                        </Form.Control>
                    </Form.Field>
                </form>
            </Box>
        </>
    );
};

export default Source;