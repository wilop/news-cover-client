import { useState } from 'react';

import { categories, editMode, editCategory, addCategory } from '../hooks/useCategory'
import Header from '../components/Header';

const Source = () => {

    const navigate = useNavigate();
    const [edit] = useState(editMode);
    const [name, setName] = useState(props.category);
    const [category, setCategory] = useState(props.category);
    const [rssUrl, setRssUrl] = useState(props.category);
    const [color, setColor] = useState('grey');
    const [list] = useState(categories);

    const handleName = (event) => {
        let value = event.target.value;
        setName(value);
        setColor('grey');
    };
    const handleCategory = (event) => {
        let value = event.target.value;
        setCategory(value);
        setColor('grey');
    };
    const handleRssUrl = (event) => {
        let value = event.target.value;
        setRssUrl(value);
        setColor('grey');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (edit) {
            editSource();
        } else {
            addSource();
        }
        navigate('/sources');
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
            <Header title='Sources' />
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
                                <Form.Select
                                    value={category}
                                    onChange={(e) => handleCategory(e)} >
                                    {list.map((category, index) => (<option key={index} value={category}>{category.name}</option>))}
                                </Form.Select>

                            </Form.Control>
                        </Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <Button value="Save" color="primary" type="submit">Save</Button>
                        </Form.Control>
                    </Form.Field>
                </form>
            </Box>
        </>
    );
};

export default Source;