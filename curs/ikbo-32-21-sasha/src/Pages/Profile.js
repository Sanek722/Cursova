// Profile.js
import React from 'react';
import AuthService from './AuthService';
import '../Styles/style5.css';
import ShinoaImage from '../images/Shinoa.png';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
        return <div>No user is logged in</div>;
    }
    const decodedToken = jwtDecode(currentUser.token);
    const logOut = () => {
        AuthService.logout();
      };


    return (
        <React.Fragment>
            <body>


                <header>
                    <a id="logo-ref" href="#"><img id="logo" src="https://cdn-icons-png.flaticon.com/512/3698/3698156.png" alt="Логотип"/></a>
                    <h2>Secure instant impersonal transfer system</h2>
                    <nav>
                        <a href="main">Сервисы</a>
                        <a href="backet">Корзина</a>
                        <a href="transfer">Денежные переводы</a>
                        <a href="tech">Техничесая поодержка</a>
                    </nav>

                    <img id="img_profile" href="/profile" src={ShinoaImage} alt="Логотип"/>

                </header>



                <section id="sect">
                    <div class="second">
                        <h1>Profile</h1>
                        <img src={ShinoaImage} width="200" height="250"/>
                        <p><strong>Username:</strong> {decodedToken.sub}</p>
                        <p><strong>ID:</strong> {decodedToken.id}</p>
                        <p><strong>Role:</strong> {decodedToken.role}</p>
                        <a href="/login" className="but" onClick={logOut}> LogOut</a>
                    </div>
                </section>



                <footer>2024© Student MIREA. ALL RIGHTS RESERVED</footer>
            </body>
        </React.Fragment>
    
    );
};

export default Profile;
