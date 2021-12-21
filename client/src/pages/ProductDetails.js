import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [id]);

  return (
    <>
      <h1 className="details">Product Details:</h1>
      <br />
      <br />
      <br />
      <div className="card">
        {product && (
          <card>
            <CardMedia
              sx={{
                width: 300,
                objectFit: "scale-down",
                height: 400,
                margin: "0 auto",
              }}
              component="img"
              image={product.image}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div className="titlefont">{product.title}</div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div className="pricefont"> ${product.price}</div>
              </Typography>
            </CardContent>
          </card>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
