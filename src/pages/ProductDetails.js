import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/products/${id}`)
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
          <Card sx={{ maxWidth: 1000 }}>
            <CardMedia
              className="cenmed"
              sx={{ width: 300, objectFit: "cover", height: 400 }}
              component="img"
              height="400"
              image={product.image}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
