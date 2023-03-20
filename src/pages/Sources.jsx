import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Box, Container, Table, Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import useSource from '../hooks/useSource'
import Header from '../components/Header';

const Sources = () => {
    const { deleteSource, loadSources } = useSource();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        loadSources()
            .then((data) => setList(data))
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [hasChanged]);

    const remove = async (index) => {
        if (index > -1 && list !== undefined) {
            let source = list[index];
            deleteSource(source)
                .then((data) => {
                    if (data._id === source._id) {
                        let list_temp = list;
                        setList(list_temp.splice(source, 1));
                        setHasChanged(!hasChanged)

                    }
                }).catch((err) => console.log(err));
            // setHasChanged(!hasChanged);
        }
    };

    const edit = async (index) => {
        if (index > -1 && list !== undefined) {
            let source = list[index];

            let state_ = { state: { source: source, edit: true } };

            navigate('/source', state_);
        }

    };

    const add = async () => {

        let state_ = { state: { source: { _id: '', name: '', url: '', category: { name: '' } }, edit: false } };

        navigate('/source', state_);

    };

    return (
        <>
            <Header title='Sources' />

            <Box style={{ width: 600, margin: 'auto' }}>
                <Container className="Table">
                    <Table size='fullwidth'>
                        <thead textColor="info">
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length && list.map((source, index) => (
                                <tr key={index}>
                                    <td> {source.name}</td>
                                    <td> {source.category.name}</td>
                                    <td>
                                        <Button color='link' inverted onClick={() => edit(index)}>Edit</Button> |
                                        <Button color='link' inverted onClick={() => remove(index)}>Delete</Button>
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

export default Sources;