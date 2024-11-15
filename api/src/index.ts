import express, {json, urlencoded} from "express";
import ProductsRoutes from "./router/products/index.js";
import authRoutes from "./router/auth/index.js";
import serverless from "serverless-http";
import ordersRoutes from "./router/orders/index.js";


const port = 3000;
const app = express();

app.use(json());
app.use(urlencoded({extended:false}))

app.use( "/products" , ProductsRoutes);
app.use( "/auth" , authRoutes);
app.use( "/orders" , ordersRoutes);

//if (process.env.NODE_ENV === "dev") {

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//}

export const handler = serverless(app);