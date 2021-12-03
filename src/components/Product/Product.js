import { useState, useContext, useEffect, useCallback } from "react";
import CartContext from "../../CartContext";
import "./Product.css";
import TotalContext from "../../TotalContext";
import { Link } from "react-router-dom";

function Product({ title, price, image, id }) {
  const [carts, setCarts] = useContext(CartContext);
  const [product, setProduct] = useState(0);
  const [total, setTotal] = useContext(TotalContext);

  const addProduct = useCallback(() => {
    setProduct(product + 1);

    const currentProduct = carts[id] || {
      amount: product,
      title: title,
      price: price,
      image: image,
    };
    currentProduct.amount = currentProduct.amount + 1;
    const newCarts = { ...carts, [id]: currentProduct };
    setCarts(newCarts);
  }, [carts, id, image, price, product, setCarts, title]);

  const removeProduct = () => {
    product > 0 && setProduct(product - 1);

    let newCart;

    const currentProduct = carts[id];

    if (!currentProduct) return;

    currentProduct.amount = currentProduct.amount - 1;

    if (currentProduct.amount === 0) {
      newCart = { ...carts };
      delete newCart[id];
    } else {
      newCart = { ...carts, [id]: currentProduct };
    }

    setCarts(newCart);
  };

  const getTotal = (cart) => {
    return Object.entries(cart).reduce((acc, item) => {
      const amount = item[1].amount;
      return acc + amount;
    }, 0);
  };

  useEffect(() => {
    if (!carts) {
      setProduct(0);
    }
  }, [carts]);

  useEffect(() => {
    if (addProduct) {
      setTotal(getTotal(carts));
    }
  }, [addProduct, carts, setTotal]);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt="shir" />
      </div>

      <div className="product-info">
        <Link to={`/productdetails/${id}`}>
          <h5>{title}</h5>
        </Link>

        <h6>${price}</h6>

        <button className="re1" onClick={removeProduct}>
          {" "}
          -{" "}
        </button>
        <span className="emz"> {product} </span>
        <button className="re2" onClick={addProduct}>
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );
}

export default Product;
