import { useState } from 'react';
import useAuth from './useAuth';

const useCategory = () => {

    const {token} = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState(null);

    return {

        editMode, setEditMode, category, setCategory, categories,

        addCategory: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/category`;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": category_.name,
                    }),

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setCategory(data));

                if (category) {
                    resolve(category);
                }
                else {
                    reject(Error('No data found'));
                }

            });

        },
        editCategory: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/category/${category_.id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setCategory(data));

                if (category) {
                    resolve(category);
                }
                else {
                    reject(Error('No data found'));
                }

            });

        },
        deleteCategory: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/category/${category_.id}`;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setCategory(data));

                if (category) {
                    resolve(category);
                }
                else {
                    reject(Error('No data deleted'));
                }
            });

        },
        loadCategories: () => {
            return new Promise((resolve, reject) => {
                fetch("/category", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setCategories(data));

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


export default useCategory;