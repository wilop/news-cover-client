import useAuth from './useAuth';

const useNews = () => {

    const { token, user } = useAuth();

    return {

        loadNews: (category) => {
            let url = category !== 'All' ? `/news/search/${user.id}?category=${category}` : `/news/${user.id}`;
            return new Promise((resolve, reject) => {
                fetch(url, {
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
                        if (data && data.data.length) {
                            data.data.sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime());
                            resolve(data.data);
                        }
                    })
                    .catch((err) => reject(err));

            });
        }

    }

};

const prepareNews = (data) => {
    console.log(data.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()));
};

export default useNews;