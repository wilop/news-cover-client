import useAuth from './useAuth';

const useSource = () => {

    const { token, user } = useAuth();

    return {

        addSource: (source) => {
            console.log('source', source);
            return new Promise((resolve, reject) => {
                let url = `/newsource`;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            url: source.url,
                            name: source.name,
                            category: source.category,
                            user: user.email
                        }
                    ),

                    redirect: 'follow',
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .then((data) => {
                        if (data) {

                            resolve(data.data);
                        }
                    })
                    .catch((err) => reject(err));

            });

        },
        editSource: (source) => {
            // console.log('source',source);
            return new Promise((resolve, reject) => {
                let url = `/newsource/${source._id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            url: source.url,
                            name: source.name,
                            category: source.category
                        }
                    ),
                    redirect: 'follow',
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .then((data) => {
                        if (data) {

                            resolve(data.data);
                        }
                    })
                    .catch((err) => reject(err));

            });

        },
        deleteSource: (source) => {
            // console.log('source',source);
            return new Promise((resolve, reject) => {
                let url = `/newsource/${source._id}`;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .then((data) => {
                        if (data) {

                            resolve(data.data);
                        }
                    })
                    .catch((err) => reject(err));
            });

        },

        loadSources: () => {
            return new Promise((resolve, reject) => {
                fetch(`/newsource`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .then((data) => {
                        if (data) {

                            resolve(data.data);
                        }
                    })
                    .catch((err) => {

                        reject(err)
                    }

                    );
            });

        }, userHasSource: () => {
            return new Promise((resolve, reject) => {
                fetch(`/newsource`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },

                    redirect: 'follow',
                })
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            resolve(true);
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .catch((err) => reject(err));
            });
        }

    }
}


export default useSource;