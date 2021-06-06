import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';


const TodoApp = () => {

    const [text, onTextChange] = useState('');
    const [products, onProductChange] = useState([]);
 
    useEffect(() => {
        getProducts();
    }, [products])

    const getProducts = async () => {
        const { data } = await axios.get('https://mynodeapptestapi.herokuapp.com/products');
        onProductChange(data.result);
    }
    const insertProduct = async () => {
        const data = {
            name: text,
            price: 0,
            desc: ""
        }
       const response = await axios.post('https://mynodeapptestapi.herokuapp.com/products', data, {
            'Content-Type': 'text/javascript'
        });
        alert(response.data.message);
        onTextChange("");
    }
    const deleteProduct = async (id) => {
        const response = await axios.delete(`https://mynodeapptestapi.herokuapp.com/products/${id}` , {
            'Content-Type': 'text/javascript'
        });
        alert(response.data.message);
        
     }
    const editProduct = async (id) => {
        let newProduct = prompt("Enter product name to updated",products[id]?.name);
        const data = {
            name: newProduct,
            price: 0,
            desc: ""
        }
        const response = await axios.put(`https://mynodeapptestapi.herokuapp.com/products/${id}`,data, {
            'Content-Type': 'text/javascript'
        });
        alert("Product Successfully Updated");
     }

    return (
        <div className="container-inverse">
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className='form-group w-75'>
                        <input type="text" placeholder="Enter something..." value={text} onChange={(e) => onTextChange(e.target.value)} className="form-control" />
                    </div>
                    <button className="btn btn-dark w-25 font-weight-bold" onClick={insertProduct} > Add Product </button>

                </div>
                <div className="row" >
                    <div className="col-md-12 mt-5">
                        {
                            products !== null &&
                            products.map((product) => {
                                return <div key={product.id} className="text-right bg-dark py-1 my-2 row" >
                                    <h3 className="text-white w-75">{product.name}</h3>
                                    <button onClick={() => deleteProduct(product.id)} style={{ width: '115px' }} className="mx-1 text-white btn btn-outline-danger">Delete</button>
                                    <button onClick={() => editProduct(product.id)} style={{ width: '115px' }} className="text-white btn btn-outline-warning" >Edit</button>
                                </div>
                            })

                        }
                    </div>
                </div>
            </div>

        </div>

    );
}

export default TodoApp;
