import "./Header.css";
import "../Cart/Cart.css";
import Cart from "../Cart/Cart";
import { useContext, useEffect, useState } from "react";
import TotalContext from "../../TotalContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import PriceContext from "../../PriceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "@mui/material";
import CartContext from "../../CartContext";
import { color } from "@mui/system";

function Header({ categories, handleCategoryChange, handlePriceChange }) {
  const [showCart, setShowCart] = useState(false);
  const [total] = useContext(TotalContext);
  const [minMax, setMinMax, price, setPrice] = useContext(PriceContext);
  const [drawer, setDrawer] = React.useState({ left: false });
  const [carts, setCarts] = useContext(CartContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer({ left: open });
  };

  const items = Object.entries(carts).map(([key, value]) => {
    return (
      <div key={key}>
        <img className="pic" src={value.image} alt="sh"></img>{" "}
        <span>{value.title}</span>: <span>{value.amount}</span>, price:
        <span>{value.price * value.amount}</span>
      </div>
    );
  });

  const allPrice = Object.entries(carts).reduce((acc, item) => {
    const totalSum = item[1].price * item[1].amount;
    return acc + totalSum;
  }, 0);

  const handleChange = (event, newValue) => handlePriceChange(newValue);

  console.log(minMax);
  console.log(price);

  return (
    <>
      <div className="top-text">
        {" "}
        <img
          className="instaicon"
          src="https://cdn.shopify.com/s/files/1/0837/2829/files/Group.png?v=1609161773"
          alt="intagram"
        ></img>
        GoCode Shop fashion
      </div>

      <nav>
        <h1 className="coteret">GoCode Shop</h1>

        <div className="sort">
          <div className="collection-sort">
            <label>Filter by:</label>
            <select onChange={handleCategoryChange}>
              <option value="all"> All </option>
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="collection-sort">
            <label>Sort by:</label>
            <select>
              <option value="/">Featured</option>
              <option value="/">Best Selling</option>
              <option value="/">Alphabetically, A-Z</option>
              <option value="/">Alphabetically, Z-A</option>
              <option value="/">Price, low to high</option>
              <option value="/">Price, high to low</option>
              <option value="/">Date, new to old</option>
              <option value="/">Date, old to new</option>
            </select>
          </div>
        </div>

        <React.Fragment key={"left"}>
          <button className="cart-button" onClick={toggleDrawer("left", true)}>
            {" "}
            ({total}) <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <Drawer
            anchor={"left"}
            open={drawer["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{
                width: 250,
              }}
              role="presentation"
              onClick={toggleDrawer("left", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              <div className="cart">
                <h2> Shopping cart</h2>
                <span className="text">{items}</span>
                <h6> You have {total} products in shopping cart</h6>
                <h6> Total price: ${Math.round(allPrice)} </h6>
                <button className="reset" onClick={() => setCarts(!carts)}>
                  Delete all products from the cart
                </button>
              </div>
            </Box>
          </Drawer>
        </React.Fragment>
        {/* {showCart && <Cart />} */}
      </nav>

      <div className="slide">
        <Box sx={{ width: 350 }}>
          <Slider
            sx={{ color: "#feaebb" }}
            min={minMax[0]}
            max={minMax[1]}
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
          Your range of Price is between {price[0]} to {price[1]}
        </Box>
      </div>
    </>
  );
}

export default Header;
