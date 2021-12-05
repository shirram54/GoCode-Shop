import Product from "../Product/Product";
import "./Products.css";

function Products({ products, category, price }) {
  const filteredProducts = products.filter(
    (product) =>
      product.price >= price[0] &&
      product.price <= price[1] &&
      (category === "all" || product.category === category)
  );
  console.log(price);
  console.log(category);
  return (
    <>
      <section className="products">
        {filteredProducts.map(
          ({
            _id: id,
            title,
            price,
            description,
            category,
            image,
            rating,
            rate,
            count,
          }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              rating={rating}
              rate={rate}
              count={count}
            />
          )
        )}
      </section>
      <br />
      <br />
      <br />
      <box className="news">
        <p className="ivymode-font">Subscribe to our newsletter </p>
        <div className="inputim">
          <label className="checkbox">
            <input
              type="radio"
              id="all"
              name="contact[tags]"
              value="prospect,news letter,women,men"
            ></input>
            <span className="checkmark"></span>
            All
          </label>
          <label className="checkbox">
            <input
              type="radio"
              id="women"
              name="contact[tags]"
              value="prospect,news letter,women,men"
            ></input>
            <span className="checkmark"></span>
            Women
          </label>
          <label className="checkbox">
            <input
              type="radio"
              id="men"
              name="contact[tags]"
              value="prospect,news letter,women,men"
            ></input>
            <span className="checkmark"></span>
            Men
          </label>
        </div>

        <input
          className="inputmail"
          type="email"
          placeholder="Email Address"
          name="contact[email]"
          autocorrect="off"
          autoCapitalize="off"
        ></input>
        <br />
        <br />
        <label className="newsletter-agree-checkbox">
          I would like to receive information about new benefits, <br />
          discounts and collections and I agree to the terms of use
          <a href="/pages/page-1" target="_blank">
            Terms of Use
          </a>
          <input
            className="newsletter-agree-checkbox-btn"
            type="checkbox"
          ></input>
          <span className="checkmark"></span>
        </label>
        <br />
        <button type="submit" className="button" name="comit">
          <span className="form-submit-large">Sign Up</span>
        </button>
      </box>
    </>
  );
}

export default Products;
