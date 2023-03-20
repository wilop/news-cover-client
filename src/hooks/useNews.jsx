import useAuth from './useAuth';

const useNews = () => {

    const { token, user } = useAuth();

    return {

        loadNews: () => {
            return new Promise((resolve, reject) => {
                fetch(`/news/${user.id}`, {
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
                    .catch((err) => reject(err));

            });
        },

        loadNewsByCategory: (category) => {
            return new Promise((resolve, reject) => {
                fetch(`/news/${user.id}?category=${category._id}`, {
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
                    .catch((err) => reject(err));

            });
        }

    }
};

export default useNews;