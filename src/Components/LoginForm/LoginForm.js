
import React, { useState } from 'react';
import { useUser } from '../UserContext/UserContext';
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, error } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email, password);
    };

    return (
        <div className="login__container">
            <h1>Sign-in</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    <h5>E-mail</h5>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit" className="login__signInButton">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default LoginForm;