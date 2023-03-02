import * as React from "react";

// import useLogin from './useLogin'

const authContext = React.createContext();

function useAuth() {
    const [authed, setAuthed] = React.useState(false);

    const [data, setData] = React.useState(null);
    const [token, setToken] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    React.useEffect(() => {
        fetch("/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
            redirect: 'follow',
        })
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [password]);

    return {
        authed, data, token, email,
        login(email_, password_) {

            setEmail(email_);
            setPassword(password_);

            return new Promise((resolve, reject) => {
                console.log('data', data);
                if (data.status === "success") {
                    setAuthed(true);
                    resolve(data);
                    setEmail(email_)
                }
                else {
                    reject(Error('No se pudo'));
                }
            });
        },

        logout() {
            return new Promise((resolve) => {
                setAuthed(false);
                setData(null);
                setToken('');
                setEmail('');
                resolve();
            });
        },
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}

// export default useAuth;