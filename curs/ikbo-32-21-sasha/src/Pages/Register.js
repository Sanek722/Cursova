// Register.js
import React, { useState } from 'react';
import AuthService from './AuthService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [role, setrole] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        AuthService.register(username, role, password).then(
            response => {
                alert("User registered successfully!");
            },
            error => {
                alert("Error registering user!");
            }
        );
    };

    return (
        <React.Fragment>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta name="description" content=""/>
                <meta name="author" content=""/>
                <title>Вход</title>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"/>
                <link href="https://getbootstrap.com/docs/4.0/examples/signin/signin.css" rel="stylesheet" crossorigin="anonymous"/>
            </head>
            <body>
            <div class="container">
                <form class="form-signin" method="post" onSubmit={handleRegister}>
                    <h2 class="form-signin-heading">Регистрация</h2>
                    <input class="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Имя пользователя" required /><br />
                    <input class="form-control" type="role" value={role} onChange={(e) => setrole(e.target.value)}  name="role" placeholder="Роль" required /><br />
                    <input class="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Пароль" required /><br />
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Зарегистрироваться</button>
                </form>
                <div class="form-signin">
                <a class="btn btn-lg btn-primary btn-block" href="/login"> Авторизация</a>
            </div>
            </div>
            </body>
        </React.Fragment>
    );
};

export default Register;
