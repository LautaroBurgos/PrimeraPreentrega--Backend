import fs from "fs/promises";
class CartManager{
    constructor(path){
        this.path=path;
        this.carts=[];
    }
    addCart= async(products)=>{   
        try{
            
            const file=await fs.readFile(this.path,'utf-8');
            this.products=JSON.parse(file);
            console.log("Tiene "+this.products.length);
            const newCart={
                id:(this.carts.length)+1,
                products:products
            }
            console.log(newCart);
            this.carts.push(newCart);         
            
        }catch(e){
            console.error(e);
            await fs.writeFile(this.path,JSON.stringify([]));
            return [];
        }
    }
    getCarts= async()=>{
        try{
            const file=await fs.readFile(this.path,'utf-8');
            this.carts=JSON.parse(file);
            return this.carts;
        }catch(e){
            console.error(e);
            await fs.writeFile(this.path,JSON.stringify([]));
            return [];
        }
    }
    getCartById=async(id)=>{
       try{
            const file=await fs.readFile(this.path,'utf-8');
            this.carts=JSON.parse(file);
            const cart=this.carts.find(cart=>cart.id==id);
            return (cart) ?  cart  : console.log("Not found");
       }catch(e){
            console.error(e);
       }
    }
    addProductToCart=async(cartId,productId)=>{
       try{
        const cart=await this.getCartById(cartId);
        
        const prod =cart.products.find(prod=>prod.id==productId);
        const index=cart.products.indexOf(prod);
        console.log(index);
        if(index!=-1){
            console.log(index);
            const product=cart.products[index];
            console.log(product);
            const updatedProduct={
                id:product.id,
                quantity:product.quantity+1
            }
            cart.products[index]=updatedProduct;

            await fs.writeFile(this.path,JSON.stringify(this.carts));
            return ("Product updated"); 
        }
            
        

        const newProduct={
            id:productId,
            quantity:1
        }
        
        cart.products.push(newProduct);
        console.log(cart);
        await fs.writeFile(this.path,JSON.stringify(this.carts));
        return ("Product added to cart"); 
       }catch(e){
            console.error(e);
       }
    }
    getProductsOfCart=async (cartId)=>{
       try{
        const cart=await this.getCartById(cartId);
        return cart.products;
       }catch(e){
        console.error(e);
       }
    }
}
export {CartManager}