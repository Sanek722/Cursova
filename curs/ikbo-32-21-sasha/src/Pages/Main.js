import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/style5.css"
import ShinoaImage from '../images/Shinoa.png';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8081';

const Main = () => {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    const token = user.token;
                    const response = await axios.get(API_URL + '/get/products', {
                        headers: {
                            'token': token
                        }
                    });
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, []);

    const addToBasket = async (product) => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const token = user.token;
                console.log(product);
                const response = await axios.post(API_URL + '/post/basket', product, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                setBasket(prevBasket => [...prevBasket, response.data]);
            }
        } catch (error) {
            console.error('There was an error adding the product to the basket!', error);
        }
    };

    return (
        <React.Fragment>
        <body>
            <header>
                <a id="logo-ref" href="#"><img id="logo" src="https://cdn-icons-png.flaticon.com/512/3698/3698156.png" alt="Логотип"/></a>
                <h2>Secure instant impersonal transfer system</h2>
                <nav>
                    <a href="main">Сервисы</a>
                    <a href="basket">Корзина</a>
                    <a href="transfer">Денежные переводы </a>
                    <a href="tech">Техничесая поодержка</a>
                </nav>
                <Link to="/profile">
                    <img id="img_profile" href="/profile" src={ShinoaImage} alt="Логотип"/>
                </Link>
            </header>
            <section id ="sect">
                <section id="section-1">
                    {products.map(product => (
                        <div key={product.id} >
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
                                            <p>Автор: {product.author}</p> 
                                            <p>Название: {product.namebook}</p> 
                                            <p>Стоимость: {product.price}</p> 
                                        </div>
                                    </div>
                                    <div className="content-pro">
                                        <div className="buttons">
                                            <div className="btn-pro">
                                                <button onClick={() => addToBasket(product)}>Добавить в корзину</button>
                                            </div>
                                            <div className="btn-pro">
                                                <button>Перейти к оплате</button>
                                            </div>
                                            <div className="btn-pro">
                                                <button>Сообщить об ошибке</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
            <footer>2024© Student MIREA. ALL RIGHTS RESERVED</footer>
        </body>
        </React.Fragment>
    );
}
export default Main;
