import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [id]);

  return (
    <div>
      <h2>Product Details:</h2>
      {product && (
        <div>
          <div className="productimg">
            <img src={product.image} alt="img" />
          </div>
          <h2>{product.title}</h2>
          <h4>${product.price}</h4>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
