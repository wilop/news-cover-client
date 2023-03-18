import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Table, Container} from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import useCategory from '../hooks/useCategory';
import Header from '../components/Header';

const Categories = () => {
    const { setCategory, setEditMode, categories, deleteCategory, loadCategories } = useCategory();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        loadCategories()
            .then((data) => setList(data))
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [categories]);

    const remove = async (category) => {
        deleteCategory(category);
        loadCategories();
        // setList(categories);
        setHasChanged(!hasChanged);

    };
    const edit = async (category) => {
        setEditMode(true);
        setCategory(category)
        navigate('/category');

    };
    const add = async () => {
        setEditMode(false);
        navigate('/category');

    };

    return (
        <>
            <Header title="Categories" />
            
                    <Box style={{width:400, margin:'auto'}}>
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
                                                <Button renderAs='string' onClick={() => edit(category)}>Edit</Button> |
                                                <Button renderAs='string' onClick={() => remove(category)}>Delete</Button>
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