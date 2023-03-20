import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { Navbar, Heading, Media, Image } from 'react-bulma-components'
import 'bulma/css/bulma.min.css';

import useCategory from '../hooks/useCategory';

function CategoryNav(props) {

    const { loadCategories } = useCategory();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [hasChanged, setHasChanged] = useState(false);
    const [is_active, setIs_active] = useState(false);

    useEffect(() => {
        loadCategories()
            .then((data) => { setList(data); console.log(data); })
            .catch((err) => {
                console.log(err);
                setList([])
            });

    }, [hasChanged]);

const select = (e, index) => {
    e.preventDefault();
    setIs_active(!is_active);
    if(list.length > 0){
        let category = list[index];
        props.handledCategoryChange(category);

    }

}
    return (
        <Navbar active color='dark'>
            <Navbar.Brand>
                <Navbar.Item hoverable onClick={(e)=> select(e)}>
                    <NavLink arrowless='true'>All News</NavLink>
                </Navbar.Item>
                <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                  {list.map((category,index)=> <Navbar.Item key={index} hoverable onClick={(e)=> select(e, index)}>
                        <NavLink arrowless='true'>
                          {category.name}
                        </NavLink>
                      
                    </Navbar.Item>)}
                </Navbar.Container>
            </Navbar.Menu>

        </Navbar>
    );

}
export default CategoryNav;