import "./Header.css";
import "../Cart/Cart.css";
import { useContext, useState } from "react";
import TotalContext from "../../TotalContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import PriceContext from "../../PriceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "@mui/material";
import CartContext from "../../CartContext";

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
        TEZENIS TEZENIS TEZENIS TEZENIS TEZENIS TEZENIS TEZENIS TEZENIS TEZENIS
        TEZENIS TEZENIS TEZENIS
      </div>

      <nav>
        <div className="sort">
          <div className="collection-sort">
            <select className="select" onChange={handleCategoryChange}>
              <option value="all"> View All </option>
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
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
      </nav>

      <div className="slide">
        <Box sx={{ width: 350 }}>
          <Slider
            sx={{ color: "black" }}
            min={minMax[0]}
            max={minMax[1]}
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
          <div className="textslide">
            {" "}
            Your range of Price is between {price[0]} to {price[1]}
          </div>
        </Box>
      </div>
    </>
  );
}

export default Header;
