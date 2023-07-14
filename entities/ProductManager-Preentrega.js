import fs from "fs/promises";
class ProductManager{
    constructor(path){
        this.products=[];
        this.path=path;
    }
    calcularMayorId= async()=>{
        let max = 0;
        this.products.forEach((prod)=>{
            if(prod.id>max){
                max=prod.id;
            }
        })
        console.log(max);
        return max;

    }
    addProduct= async(product)=>{   
        try{
            const file=await fs.readFile(this.path,'utf-8');
            this.products=JSON.parse(file);

            const productAlreadyExists=this.products.find(prod=>prod.code==newProduct.code);
            if(productAlreadyExists){
                return console.log("The product is already at the list.");
            }


            let maxId = 0;
            this.products.forEach((prod)=>{
                if(prod.id>maxId){
                    maxId=prod.id;
                }
            })
            

            const newProduct={
                id:maxId+1,
                title:product.title,
                description:product.description,
                price:product.price,
                thumbnail:product.thumbnail,
                code:product.code,
                stock:product.stock,
                category:product.category,
                status:true
            }
        

            this.products.push(newProduct);
            
            await fs.writeFile(this.path,JSON.stringify(this.products));
        }catch(e){
            console.log(e);
            await fs.writeFile(this.path,JSON.stringify([]));
            return [];
        }
    }

    checkProduct=(product) =>{
        return (Object.values(product).every(valor => Boolean(valor)));
    }
    getProducts= async()=>{
        try{
            const file=await fs.readFile(this.path,'utf-8');
            this.products=JSON.parse(file);
            return this.products;
        }catch(e){
            console.error(e);
            await fs.writeFile(this.path,JSON.stringify([]));
            return [];
        }
    }
    getProductById=async(id)=>{
       try{
            const file=await fs.readFile(this.path,'utf-8');
            this.products=JSON.parse(file);
            const prod=this.products.find(product=>product.id==id);
            return (prod) ?  prod  : console.log("Not found");
       }catch(e){
            console.error(e);
       }
    }
    updateProduct= async(id,updatedProduct)=>{
       try{
            if(this.checkProduct(updatedProduct)){
                const idUpdatedProduct={
                    id:id,
                    title:updatedProduct.title,
                    description:updatedProduct.description,
                    price:updatedProduct.price,
                    thumbnail:updatedProduct.thumbnail,
                    code:updatedProduct.code,
                    stock:updatedProduct.stock,
                    category:updatedProduct.category,
                    status:updatedProduct.status
                }
                if(this.products.find(prod=>(prod.code==idUpdatedProduct.code)&&(prod.id!=idUpdatedProduct.id))){
                    return console.log("The code set to this product,is already used by another product.");
                }
                const file=await fs.readFile(this.path,'utf-8');
                this.products=JSON.parse(file);
                this.deleteProduct(id);
                this.products.splice((id-1),0,idUpdatedProduct);  
                
                await fs.writeFile(this.path,JSON.stringify(this.products));
            }
       }catch(e){
            console.error(e);
       }
    }
    deleteProduct=async (id)=>{
        try{
            console.log(this.path);
            const file=await fs.readFile(this.path,'utf-8');
            this.products=JSON.parse(file);
            console.log(await this.getProductById(id));
            if(await this.getProductById(id)){
                this.products.splice((id-1),1);
                await fs.writeFile(this.path,JSON.stringify(this.products));
            }else{
                console.log("Can't delete product,not found");
            }
        }catch(e){
            console.error(e);
        }
    }
    deleteAllProducts=async ()=>{
        try{
            const file=await fs.readFile(this.path,'utf-8');
            this.products=JSON.parse(file);
            await fs.writeFile(this.path,JSON.stringify([]));
        }catch(e){
            console.error(e);
        }
    }
}


export {ProductManager};