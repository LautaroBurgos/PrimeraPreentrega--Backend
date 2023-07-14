import { Router } from "express";
import { CartManager } from "../entities/CartManager-Preentrega.js";
const cartManager = new CartManager("carts.json");
const cartsRouter= Router();


cartsRouter.get("/:cid",async(req,res)=>{
    try{
        const {cid} =req.params;
        const products= await cartManager.getProductsOfCart(cid);
        res.send(products);
    }catch(e){
        res.status(502).send({error:true});
    }
});

cartsRouter.post("/",async(req,res)=>{
    const body =req.body;
        try{
            const result=await cartManager.addCart(body.products);
            res.send(result);
        }catch(e){
            console.log(e);
            res.status(502).send({error:true});
        }

});

cartsRouter.post("/:cid/product/:pid",async(req,res)=>{
    const {cid} =req.params;
    const {pid} =req.params;
        try{
            res.send(cartManager.addProductToCart(cid,pid));
        }catch(e){
            console.log(e);
            res.status(502).send({error:true});
        }

});

export default cartsRouter;