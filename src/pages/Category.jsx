import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Form, Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import useCategory from '../hooks/useCategory';
import Header from "../components/Header";

const Category = (props) => {
    const { editCategory, addCategory } = useCategory();
    const navigate = useNavigate();
    const location = useLocation();
    const [color, setColor] = useState('grey');
    const [edit] = useState(location.state.edit);
    const [category, setCategory] = useState(location.state.category);
    const [name, setName] = useState(category.name);

    const handleName = (event) => {
        let value = event.target.value;
        setName(value);
        setColor('grey');
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (edit) {

            let oldCategory = {
                _id: category._id,
                name: name
            };

            editCategory(oldCategory)
                .then((data) => {
                    navigate('/categories');

                }).catch((err) => {
                    console.log(err)
                    setColor('danger');
                });

        } else {
            let newCategory = {
                name: name
            }
            addCategory(newCategory)
                .then((data) => {
                    navigate('/categories');

                }).catch((err) => {
                    console.log(err)
                    setColor('danger');
                });
        }
    };

    const handleReset = (event) => {
        event.preventDefault();
        setColor('grey');
        setCategory('');
    };
    return (
        <>
            <Header title={edit ? 'Editing category' : 'Adding new category'} />
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
                                    placeholder="Name"
                                    onChange={(e) => handleName(e)} />

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

export default Category;