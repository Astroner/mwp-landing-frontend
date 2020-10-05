import { NextPage } from 'next';
import { useRouter } from "next/router";
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../api/user';
import { addToken } from '../Model/user/action';

export interface IAuth {
    
}

const Auth: NextPage<IAuth> = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const dispatch = useDispatch();

    const submit = useCallback(() => {
        signin(
            email,
            password
        )
            .then(({ jwt }) => {
                dispatch(addToken({ token: jwt }));
                router.push("/")
            })
            .catch(() => {
                alert("Error")
            })
    }, [email, password])

    return (
        <div>
            <div>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
            </div>
            <div>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            </div>
            <div>
                <button onClick={submit}>SignIn</button>
            </div>
        </div>
    )
}

export default Auth;