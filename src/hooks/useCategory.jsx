import useAuth from './useAuth';

const useCategory = () => {

    const { token } = useAuth();

    return {

        addCategory: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/categories`;
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

        editCategory: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/categories/${category_._id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": category_.name,
                    }),

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

        deleteCategory: (category_) => {
            return new Promise((resolve, reject) => {
                let url = `/categories/${category_._id}`;
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

        loadCategories: () => {
            return new Promise((resolve, reject) => {
                fetch("/categories", {
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

export default useCategory;