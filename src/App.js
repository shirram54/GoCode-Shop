import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Product from './components/Product/Product';
import Counter from './components/Counter/Counter';
import CartContext from './CartContext';
import Cart from './components/Cart/Cart';
import TotalContext from './TotalContext';




function App() {


  const [initProducts, setInitProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);



  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
        setInitProducts(data);
        setProducts(data);
      });
  }, []);



  const categories = initProducts.map(p => p.category).filter((value, index, array) => array.indexOf(value) === index);

  const handleChange = (e) => {
    if (e.target.value === 'all') {
      setProducts(initProducts);
    } else {
      const filterProducts = initProducts.filter((product) => product.category === e.target.value);
      setProducts(filterProducts);
    }
  };



  return (
    <div>

      <Counter />
      <CartContext.Provider value={[carts, setCarts]}>
        <TotalContext.Provider value={[total, setTotal]}>
          <Header categories={categories} handleChange={handleChange} />
          <Products products={products} />
        </TotalContext.Provider >
      </CartContext.Provider>

    </div >
  );

}

export default App;




