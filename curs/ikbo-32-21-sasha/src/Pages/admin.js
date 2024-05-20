import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/style5.css";
import ShinoaImage from "../images/Shinoa.png"
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8081';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ author: '', price: '', namebook: '' });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const token = user.token;
                const response = await axios.post(API_URL + '/post/product', newProduct, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                setProducts(prevProducts => [...prevProducts, response.data]);
                setNewProduct({ author: '', price: '', namebook: '' });
            }
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const token = user.token;
                const response = await axios.delete(`${API_URL}/delete/product/${id}`, {
                    headers: {
                        'token': token
                    }
                });
                setProducts(response.data);
            }
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    return (
        <React.Fragment>
        <body>
            <header>
                <a id="logo-ref" href="#"><img id="logo" src="https://cdn-icons-png.flaticon.com/512/3698/3698156.png" alt="Логотип"/></a>
                <h2>Admin Panel</h2>
                <nav>
                    <a href="/main">Main</a>
                    <a href="/admin">Admin</a>
                    <a href="/basket">Basket</a>
                    <a href="/transfer">Transfer</a>
                    <a href="/tech">Support</a>
                </nav>
                <Link to="/profile">
                    <img id="img_profile" href="/profile" src={ShinoaImage} alt="Profile"/>
                </Link>
            </header>
            <section id="sect">
                <section id="section-1">
                    <div id="Add_Product">
                        <form  class="containerr"  onSubmit={addProduct}>
                            <div class="boxer">
                                <div class="content">
                                    <span></span>
                                    <span></span>
                                    <h1 >Добавление товара</h1>
                                    <p >Author:</p>
                                    <p><input type="text" name="author" value={newProduct.author} onChange={handleInputChange} required/></p>
                                    <p >Name:</p>
                                    <p><input type="text" name="namebook" value={newProduct.namebook} onChange={handleInputChange} required/></p>
                                    <p >Price:</p>
                                    <p><input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required/></p>
                                    <button type="submit">Add Product</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div id="Product_List">
                        <h2>Товары</h2>

                        {products.map(product => (
                            <div key={product.id}>
                                <div className="containerr">
                                    <div className="container-pro">
                                        <div className="wrapper-pro">
                                            <a>
                                                <img
                                                    id="img_product"
                                                    src={ShinoaImage} // Подставьте изображение продукта
                                                    alt="Product"
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </a>
                                            <div className="title">
                                                <p>Автор: {product.author}</p> 
                                                <p>Название: {product.namebook}</p> 
                                                <p>Стоимость: {product.price}</p> 
                                            </div>
                                            
                                            <div className="buttons">
                                                <button className="form__btn-submit" onClick={() => deleteProduct(product.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </section>
            </section>
            <footer>2024© Student MIREA. ALL RIGHTS RESERVED</footer>
        </body>
        </React.Fragment>
    );
}

export default Admin;
