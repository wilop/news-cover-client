import { useNavigate } from 'react-router-dom';

import { Box, Button, Table } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import { editCategory, setEditMode, categories, deleteCategory, loadCategories , addCategory} from '../hooks/useCategory';
import Category from './Category';

const Categories = () => {

    const navigate = useNavigate();
    const [list, setList] = useState(categories);

    const remove = async (category) => {
        deleteCategory(category);
        loadCategories();
        setList(categories);

    };
    const edit = async (category) => {
        setEditMode(true);
        editCategory(category)
        navigate('/category');

    };
    const add = async () => {
        setEditMode(false);
        addCategory(Category);
        navigate('/category');

    };

    return (
        <>
            <Header title="Categories" />
            <Box>
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
                <Button onClick={() => add()}>Add New</Button>
            </Box>
        </>
    );
};

export default Categories;