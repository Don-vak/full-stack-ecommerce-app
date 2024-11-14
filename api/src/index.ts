import express, {json, urlencoded} from "express";
import ProductsRouter from "./router/products";
import authRoutes from "./router/auth";


const port = 3000;

const app = express();

app.use(json());
app.use(urlencoded({extended:false}))

app.use( "/products" , ProductsRouter);
app.use( "/auth" , authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});