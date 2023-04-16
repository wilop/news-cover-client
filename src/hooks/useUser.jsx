import useAuth from './useAuth';

const useUser = () => {

    const { token } = useAuth();

    return {

        addUser: (user_) => {
            
            return new Promise((resolve, reject) => {
                let url = `/user`;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email:user_.email,
                        first_name:user_.first_name,
                        last_name:user_.last_name,
                        phone:user_.phone,
                        password:user_.password,
                        role:{name:'user'}
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

        loadUsers: () => {
            return new Promise((resolve, reject) => {
                fetch("/user", {
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

export default useUser;