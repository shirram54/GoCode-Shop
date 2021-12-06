// import { v4 as uuidv4 } from "uuid";
import express, { json } from "express";
// import { readFile, writeFile } from "fs/promises";
import fetch from "node-fetch";
import mongoose from "mongoose";
// import { stringify } from "querystring";
import dotenv from "dotenv";

dotenv.config();

const Product = mongoose.model("Product", {
  title: String,
  price: Number,
  category: String,
  image: String,
});

const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
  const { term } = req.query;
  try {
    // const data = await readFile("./products.json", "utf8");
    // let products = JSON.parse(data);
    const products = await Product.find();
    if (term) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    }
    res.send(products);
  } catch (e) {
    throw e;
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // const data = await readFile("./products.json", "utf8");
    // const products = JSON.parse(data);
    const product = await Product.findById(id);
    res.send(product);
  } catch (e) {
    throw e;
  }
});

app.post("/products", async (req, res) => {
  const { title } = req.body;
  // const data = await readFile("./products.json", "utf8");
  // const products = JSON.parse(data);
  const product = new Product({ title });
  // const newProduct = {
  //   id: uuidv4(),
  //   title,
  //   category: "men's clothing",
  //   price: 20.1,
  //   image:
  //     "https://hamalbish.co.il/wp-content/uploads/2019/06/%D7%97%D7%95%D7%9C%D7%A6%D7%AA-%D7%9C%D7%99%D7%99%D7%A7%D7%A8%D7%94-%D7%92%D7%91%D7%A8-V.jpg",
  // };
  await product.save();
  // await writeFile("./products.json", JSON.stringify(products));
  res.send(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.send({ msg: "Success" });
    // const data = await readFile("./products.json", "utf8");
    // const products = JSON.parse(data);
    // const productIndex = products.findIndex((product) => product.id === id);
    // products.splice(productIndex, 1);
    // await writeFile("./products.json", JSON.stringify(products));
  } catch (e) {
    res.send({ msg: "Failed" });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await Product.findOneAndUpdate(id, body);
  // const data = await readFile("./products.json", "utf8");
  // const products = JSON.parse(data);
  // const productIndex = products.findIndex((product) => product.id === id);

  // for (const prop in body) {
  //   products[productIndex] = { ...products[productIndex], [prop]: body[prop] };
  // }

  // await writeFile("./products.json", JSON.stringify(products));
  res.send(product);
});

async function initProducts() {
  const productsFromDb = await Product.find();
  // const data = await readFile("./products.json", "utf8");
  if (!productsFromDb.length) {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    const mappedProducts = products.map((product) => ({
      ...product,
      id: null,
    }));
    await Product.insertMany(mappedProducts);

    // await writeFile("./products.json", JSON.stringify(mappedProducts));
  }
}

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  (err) => {
    if (err) {
      console.log(err ? "db error" : "db connected");
    }
    app.listen(process.env.PORT || 8000);
    initProducts();
  }
);
