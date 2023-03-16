import { useState } from 'react';

import { categories } from '../hooks/useCategory'
import Header from '../components/Header';

const Sources = () => {

    const navigate = useNavigate();
    const [list, setList] = useState(Sources);

    const remove = async (source) => {
        deleteSource(source);
        loadSource();
        setList(categories);

    };
    const edit = async (source) => {
        setEditMode(true);
        setSource(source)
        navigate('/sources');

    };
    const add = async () => {
        setEditMode(false);
        navigate('/sources');

    };

    return (
        <>
            <Header title='Sources' />
            <Box>
                <Container className="Table">
                    <Table>
                        <thead textColor="info">
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((source, index) => (
                                <tr key={index}>
                                    <td> {source.name}</td>
                                    <td> {source.source}</td>
                                    <td>
                                        <Button renderAs='string' onClick={() => edit(source)}>Edit</Button> |
                                        <Button renderAs='string' onClick={() => remove(source)}>Delete</Button>
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

export default Sources;