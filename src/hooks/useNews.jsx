import useAuth from './useAuth';

const useNews = () => {

    const { token, user } = useAuth();

    return {

        loadNews: (query_ = 'all', param_ = '') => {
            let url = `http://localhost:4001`;
            let query = '';
            let param = {};
            switch (query_) {
                case 'all':
                    query = 'Query {news';
                    param = {}
                    break;
            
                case 'category':
                    query = 'Query($category: String!) {\n  newsByCategory(category: $category)';
                    param = {"category": param_};
                    break;
            
                case 'keyword':
                    query = 'Query($keyword: String!) {\n  newsByKeyword(keyword: $keyword)';
                    param = {"keyword": param_};
                    break;
            
                case 'tags':
                    query = 'Query($tags: [String]!) {\n  newsByTags(tags: $tags)';
                    param = {"tags": param_};
                    break;
            
                default:
                    query = 'Query {news';
                    param = {};
                    break;
            }

            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "query": `query ${query}{\n    category {\n      name\n    }\n    date\n    image\n    permalink\n    short_description\n    tags\n    title\n  }\n}`,
                        "variables": param
                    }),

                    redirect: 'follow',
                })
                    .then((res) => {
                        if (res.ok) {
                            console.log(res);
                            return res.json();
                        } else {
                            throw new Error(res.statusText);
                        }
                    })
                    .then((data) => {
                        switch (query_) {
                            case 'all':
                                resolve(data.data.news);  
                                break;
                            case 'category':
                                resolve(data.data.newsByCategory);  
                                break;
                            case 'keyword':
                                resolve(data.data.newsByKeyword);  
                                break;
                            case 'tags':
                                resolve(data.data.newsByTags);  
                                break;
                            default:
                                resolve(data.data.news);  
                                break;
                        }
                       
                    })
                    .catch((err) => reject(err));

            });
        },


    }

};

export default useNews;