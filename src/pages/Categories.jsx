import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Table, Container } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import useCategory from '../hooks/useCategory';
import Header from '../components/Header';

const Categories = () => {
    const {  deleteCategory, loadCategories } = useCategory();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        loadCategories()
            .then((data) => { setList(data); })
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [hasChanged]);

    const remove = async (index) => {
        if (index > -1 && list !== undefined) {
            let category = list[index];
            deleteCategory(category)
                .then((data) => {
                    if (data._id === category._id) {
                        let list_temp = list;
                        setList(list_temp.splice(category, 1));
                        setHasChanged(!hasChanged)

                    }
                }).catch((err) => console.log(err));
            // setHasChanged(!hasChanged);
        }
    };

    const edit = async (index) => {
        if (index > -1 && list !== undefined) {
            let category = list[index];
       
            let state_ = { state: { category: category, edit: true } };

            navigate('/category', state_);
        }

    };

    const add = async () => {
      
        let state_ = { state: { category: {_id:'', name:''}, edit: false } };

        navigate('/category', state_);

    };

    return (
        <>
            <Header title="Categories" />

            <Box style={{ width: 600, margin: 'auto' }}>
                <Container className="Table">
                    <Table>
                        <thead textColor="info">
                            <tr>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((category, index) => (
                                <tr key={index}>
                                    <td> {category.name}</td>
                                    <td>
                                        <Button inverted color='link' onClick={() => edit(index)}>Edit</Button> |
                                        <Button inverted color='link' onClick={() => remove(index)}>Delete</Button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </Table>
                </Container>
                <Button color='dark' onClick={() => add()}>Add New</Button>
            </Box>
        </>
    );
};

export default Categories;