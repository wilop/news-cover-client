import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Heading, Media, Image } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

import useCategory from '../hooks/useCategory';

function CategoryNav(props) {

    const { loadCategories } = useCategory();
    const [list, setList] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        loadCategories()
            .then((data) => { setList(data); console.log(data); })
            .catch((err) => {
                setList([])
            });

    }, [hasChanged]);

    const select = (e, index) => {
        e.preventDefault();
        if (list.length > 0) {
            let category = list[index];
            props.handleCategoryChange(category.name);

        }
    };
    const allNews= (e) => {
        e.preventDefault();
        props.handleAllNews();
    }

    return (
        <Navbar active color='dark'>
            <Navbar.Brand>
                <Navbar.Item hoverable onClick={(e) => allNews(e)}>
                    <NavLink arrowless='true'>All News</NavLink>
                </Navbar.Item>
                <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                    {list.map((category, index) => <Navbar.Item key={index} hoverable onClick={(e) => select(e, index)}>
                        <NavLink>
                            {category.name}
                        </NavLink>

                    </Navbar.Item>)}
                </Navbar.Container>
            </Navbar.Menu>

        </Navbar>
    );

};

export default CategoryNav;