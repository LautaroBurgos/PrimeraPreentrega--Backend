import {Router} from "express";
import { ProductManager } from "../entities/ProductManager-Preentrega.js";
const productManager = new ProductManager("products.json");
const productsRouter = Router();

productsRouter.put("/:pid",async(req,res)=>{
    try{
        const {pid}=req.params;
        const product=req.body;
        const result = await productManager.updateProduct(pid,product);
        res.send({update:true});
    }catch(e){
        res.status(502).send({error:true});
    }
})

productsRouter.get("/",async(req,res)=>{
    const {limit}=req.query;
    try{
        const products=await productManager.getProducts();
        if(limit!=undefined && limit>0){
            prods=(products.splice(0,limit));
        }
        res.send(products);
    }catch(e){
        res.status(502).send({error:true});
    }
});

productsRouter.get("/:pid",async(req,res)=>{
    try{
        const {pid} =req.params;
        const product= await productManager.getProductById(pid);
        res.send(product);
    }catch(e){
        res.status(502).send({error:true});
    }
});

productsRouter.post("/",async(req,res)=>{
    const body =req.body;
    if(!body.title || !body.description || !body.price || !body.code || !body.stock || !body.category){
        res.send({error:true,msg:"Contenido faltante"})
    }else{
        try{
            const result=await productManager.addProduct(body);
            res.send(result);
        }catch(e){
            console.log(e);
            res.status(502).send({error:true});
        }
    }
});

productsRouter.delete("/:pid",async(req,res)=>{
    try{
        const {pid}=req.params;
        await productManager.deleteProduct(pid);
        res.send(await productManager.getProducts());
    }catch(e){
        res.status(502).send({error:true});
    }
});

productsRouter.delete("",async(req,res)=>{
    await productManager.deleteAllProducts();
    res.send({deleted:true});
});
export default productsRouter;