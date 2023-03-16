import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, Form } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import { category, editMode, editCategory, addCategory } from '../hooks/useCategory';
import Header from "../components/Header";

const Category = (props) => {

    const navigate = useNavigate();
    const [edit] = useState(editMode);
    const [category_, setCategory_] = useState(category);
    const [name, setName] = useState(category_.name);
    const [color, setColor] = useState('grey');

    const handleName = (event) => {
        let value = event.target.value;
        setName(value);
        let cat = category_;
        cat.name = value;
        setCategory_(cat);
        setColor('grey');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (edit) {
            editCategory(category_);
        } else {
            addCategory(name);
        }
        navigate('/categories');
    };

    const handleReset = (event) => {
        event.preventDefault();
        setColor('grey');
        setCategory_('');
    };
    return (
        <>
            <Header title="Category" />
            <Box style={{ width: 400, margin: 'auto' }}>
                <form onSubmit={(e) => handleSubmit(e)}
                    onReset={(e) => handleReset(e)}>
                    <Form.Field>
                        <Form.Label>Category
                            <Form.Control>
                                <Form.Input color={color} textColor={color}
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="name"
                                    onChange={(e) => handleName(e)} />

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

export default Category;