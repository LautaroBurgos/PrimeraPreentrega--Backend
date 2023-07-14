import express from "express";
import productsRouter from "./routers/productsRouter.js";
import cartsRouter from "./routers/cartsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products",productsRouter);
app.use("/api/carts/",cartsRouter);

app.listen(8080,()=>{
    console.log("Escuchando en el puerto 8080!");
});
// app.get("/products",async (req,res)=>{
//     const {limit}=req.query;
//     const productManager= new ProductManager("./products.json");
//     let prods=await productManager.getProducts();
//     if(limit!=undefined && limit>0){
//         prods=(prods.splice(0,limit));
//     }
//     res.send(prods);
// });

// app.get("/products/:pid",async (req,res)=>{
//     const {pid}=req.params;
//     const productManager= new ProductManager("./products.json");
//     const prod= await productManager.getProductById(parseInt(pid));
//     res.send(prod);
// });
