import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/style5.css";
import ShinoaImage from '../images/Shinoa.png';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8081';

const Basket = () => {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    const token = user.token;
                    const response = await axios.get(API_URL + '/get/basket', {
                        headers: {
                            'token': token
                        }
                    });
                    setBasket(response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the basket!', error);
            }
        };

        fetchBasket();
    }, []);

    const removeFromBasket = async (id) => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const token = user.token;
                const response = await axios.delete(`${API_URL}/delete/basket/${id}`, {
                    headers: {
                        'token': token
                    }
                });
                setBasket(response.data);
            }
        } catch (error) {
            console.error('There was an error removing the product from the basket!', error);
        }
    };

    const clearBasket = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const token = user.token;
                await axios.post(`${API_URL}/clear`, {}, {
                    headers: {
                        'token': token
                    }
                });
                setBasket([]); // Обновляем состояние корзины на пустой массив
            }
            window.location.reload();
        } catch (error) {
            console.error('There was an error clearing the basket!', error);
        }
    };

    return (
        <React.Fragment>
        <body>
            <header>
                <a id="logo-ref" href="#"><img id="logo" src="https://cdn-icons-png.flaticon.com/512/3698/3698156.png" alt="Логотип"/></a>
                <h2>Secure instant impersonal transfer system</h2>
                <nav>
                    <a href="/main">Сервисы</a>
                    <a href="/basket">Корзина</a>
                    <a href="/transfer">Денежные переводы</a>
                    <a href="/tech">Техническая поддержка</a>
                </nav>
                <Link to="/profile">
                    <img id="img_profile" href="/profile" src={ShinoaImage} alt="Логотип"/>
                </Link>
            </header>
            
            <section id = "sect">
            <h2>Корзина товаров: </h2>
                <section id="section-1">
                    {basket.length > 0 ? (
                        basket.map(item => (
                            <div key={item.id} >
                                <div className="containerr">
                                    <div className="container-pro">
                                        <div className="wrapper-pro">
                                            <a>
                                                <img
                                                    id="img_product"
                                                    src={ShinoaImage} // Подставьте изображение продукта
                                                    alt="Логотип"
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </a>
                                            <div className="title">
                                                <p>Автор: {item.author}</p> {/* Используйте данные из объекта item */}
                                            </div>
                                            <div className="title">
                                                <p>Стоимость: {item.price}</p> {/* Используйте данные из объекта item */}
                                            </div>
                                        </div>
                                        <div className="content-pro">
                                            <div className="buttons">
                                                <div className="btn-pro">
                                                    <button onClick={() => removeFromBasket(item.id)}>Удалить из корзины</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Корзина пуста</p>
                    )}
                    
                </section>
                {basket.length > 0 && (
                    <button className="but"onClick={clearBasket}>Очистить корзину</button>
                )}
            </section>
            <footer>2024© Student MIREA. ALL RIGHTS RESERVED</footer>
        </body>
        </React.Fragment>
    );
}

export default Basket;
