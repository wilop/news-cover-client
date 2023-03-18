import { useState } from 'react';
import useAuth from './useAuth';

const useSource= () => {
    
    const {token} = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [source, setSource] = useState(null);
    const [sources, setSources] = useState(null);

    return {

        editMode, setEditMode, source, setSource, sources,

        addSource: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/source`;
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
                    .then((data) => setSource(data));

                if (sources) {
                    resolve(source);
                }
                else {
                    reject(Error('No data found'));
                }

            });

        },
        editSource: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/source/${category_.id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setSource(data));

                if (source) {
                    resolve(source);
                }
                else {
                    reject(Error('No data found'));
                }

            });

        },
        deleteSource: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/source/${category_.id}`;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setSource(data));

                if (source) {
                    resolve(source);
                }
                else {
                    reject(Error('No data deleted'));
                }
            });

        },
        loadSources: () => {
            return new Promise((resolve, reject) => {
                fetch("/source", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => res.json())
                    .then((data) => setSources(data));

                if (sources) {
                    resolve(sources);
                }
                else {
                    reject(Error('No data found'));
                }
            });
        }


    }
}


export default useSource;