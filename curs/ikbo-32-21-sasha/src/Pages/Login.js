// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        AuthService.login(username, password).then(
            () => {
                navigate('/profile'); // Переход на страницу профиля
                window.location.reload();
            },
            error => {
                alert("Error logging in!");
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
            <form class="form-signin" onSubmit={handleLogin}>
                <h2 class="form-signin-heading">Вход</h2>
                <div class="alert alert-success" role="alert">Вы вышли из аккаунта</div>        <p>
                <label for="username" class="sr-only">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" class="form-control" placeholder="Имя пользователя" required autofocus/>
            </p>
                <p>
                <label for="password" class="sr-only">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" class="form-control" placeholder="Пароль" required/>
                </p>
                <input name="_csrf" type="hidden" value="0e2eab93-7475-408f-82ae-6ec3ba98efa9" />
                <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
            </form>
            <div class="form-signin">
                <a class="btn btn-lg btn-primary btn-block" href="/"> Регистрация</a>
            </div>
            </div>
            </body>
        </React.Fragment>
    );
};

export default Login;