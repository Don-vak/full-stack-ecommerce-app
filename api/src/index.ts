import express, {json, urlencoded} from "express";
import ProductsRouter from "./router/products";


const port = 3000;

const app = express();

app.use(json());
app.use(urlencoded({extended:false}))

app.use( "/products" , ProductsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});