import { useState } from 'react';
import useAuth from './useAuth';

const useNews = () => {

    const { token } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [news, setNews] = useState(null);

    return {

        editMode, setEditMode, setNews, news,

        loadCategories: (user) => {
            return new Promise((resolve, reject) => {
                fetch(`/news/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => console.log(res))
                    .then((data) => { setCategories(data); console.log(data) });

                if (categories) {
                    resolve(categories);
                }
                else {
                    reject(Error('No data found'));
                }
            });
        }


    }
}


export default useNews;