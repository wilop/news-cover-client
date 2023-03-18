import { useState, useEffect } from 'react';

import { Box, Heading, Container, Image, } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

import Header from '../components/Header';
import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';

const News=()=> {
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch("/team", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer {$token}',
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
        })
            .then((res) => res.json())
            .then((data) => { setData(data); setList(data.data); });
    }, []);

    // const teamList = (
    //     list !== undefined ? <TeamList teams={list} /> : <p>Loading...</p>
    // )
    let teams = list.filter(item => item !== list[32]);
    // teams = data ? data.data : [];
    console.log('team', teams);

    console.log('list', list);


    return (
        <>
            <div >
               <Header title='Your unique News Cover'/>
                <div className="App">
                    <header className="App-header">
                        <div>{!data ? <Spinner /> : <Box><NewsList teams={teams} /></Box>}</div>
                    </header>
                </div>
            </div>

        </>
    );
}
export default News;