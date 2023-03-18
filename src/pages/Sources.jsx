import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Box, Container, Table, Button } from 'react-bulma-components';
import 'bulma/css/bulma.min.css';

import useSource from '../hooks/useSource'
import Header from '../components/Header';

const Sources = () => {
    const { sources, deleteSource, setEditMode, setSource, loadSources } = useSource();
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

    }, [sources]);

    const remove = async (source) => {
        deleteSource(source);
        loadSources();
        // setList(sources);
        setHasChanged(!hasChanged);

    };
    const edit = async (source) => {
        setEditMode(true);
        setSource(source)
        navigate('/source');

    };
    const add = async () => {
        setEditMode(false);
        navigate('/source');

    };

    return (
        <>
            <Header title='Sources' />

            <Box style={{width:400, margin:'auto'}}>
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
                <Button color='dark' onClick={() => add()}>Add New</Button>
            </Box>
        </>
    );
};

export default Sources;