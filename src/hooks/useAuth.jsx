import { useState, useEffect, createContext, useContext } from "react";

const authContext = createContext();

function useAuth() {
    const [authed, setAuthed] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: ''
    });

    let [session, setSession] = useState({
        token: '',
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        authed: false
    });


    useEffect(() => {
        setAuthed(session.authed);
        setUser(
            {
                id: session.id,
                first_name: session.first_name,
                last_name: session.last_name,
                email: session.email,
                role: session.role
            }
        );
        setToken(session.token);

    }, [session, token]);

    async function getSession(url = "", data = {}) {

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", // include*, same-origin, omit
            headers: {
                "Content-Type": "application/json",

            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response // parses JSON response into native JavaScript objects
    };

    return {
        authed, token, user,

        async login(email_, password_) {

            let response = await getSession("/session", { email: email_ })
            let data_ = await response.json();

            return new Promise((resolve, reject) => {
                if (response.status === 201) {
                    session = {
                        token: data_.token,
                        id: data_.data._id,
                        first_name: data_.data.first_name,
                        last_name: data_.data.last_name,
                        email: data_.data.email,
                        role: data_.data.role.name,
                        authed: true
                    }
                    setSession(session);
                    resolve(session);
                }
                else {
                    reject(Error('No se pudo'));
                }
            });



        },

        logout() {
            return new Promise((resolve) => {
                session = {
                    token: '',
                    id: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    role: '',
                    authed: false
                }
                setSession(session);
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
    return useContext(authContext);
};