import React, {useContext, useState, useEffect} from 'react';
import userContext from '../context/userContext';

const LoginPage = (props) => {

    const UserContext = useContext(userContext);
    const { userInfo, error, loading, postLoginUser } = UserContext;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(Object.keys(userInfo).length !== 0) {
            props.history.push(`/inicio/${userInfo.cod_empresa}`)
        }
    }, [userInfo, props.history]);

    const submitHandler = e => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === '') {
            setMessage(true);
            return;
        } 

        setMessage(false);
        postLoginUser(email, password);
    }

    return (  
        <form onSubmit={submitHandler}>
            <div>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {error && <strong>{error}</strong> }
            {loading && <p>Cargando...</p> }
            {message && <strong>Faltan campos por llenar</strong>}

            <br/>
            <button>Iniciar Sesión</button>
        </form>
    );
}

export default LoginPage;