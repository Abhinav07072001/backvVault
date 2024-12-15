import path from 'path';
import ProductModel from '../model/products.model.js';

export default class ProductController{
    // views products.html
    /*getProducts(req,res){
        console.log(path.resolve());
        return res.sendFile(path.join(path.resolve(),"src","views","products.html"));
    }*/

    // model products.js
    getProducts(req,res){
        console.log("Inside getProducts");
        let products= ProductModel.get();
        console.log("Fetched Product", products);
        res.render("products",{products:products, userEmail: req.session.userEmail});
        //return res.sendFile(path.join(path.resolve(),"src",'views',"products.html" ));
    }

    //get new product
    getAddForm(req,res){
        return res.render('addProduct',{
            errorMessage: null, userEmail: req.session.userEmail
        });
    }

    //post new product
    addNewProduct(req,res,next){
        const {name, desc, price}=req.body;
        const imageUrl='images/' + req.file.filename;
        ProductModel.addForm(name, desc, price,imageUrl);
        let products= ProductModel.get();
        res.render("products",{products, userEmail: req.session.userEmail});
    }

    // view of update existing product view
    updateProductView(req,res,next){
        const id= req.params.id; // NOTE:- req.params are use to take care of URL parameters
        const ProductFound= ProductModel.getById(id);
        if(ProductFound){
            res.render('update-product',{
                product:ProductFound,
                errorMessage:null, userEmail: req.session.userEmail
            });
        }

        else{
            res.status(401).send('Product not found');
        }
    }

    // post update of existing Product
    PostUpdateProduct(req,res,next)
    {
        ProductModel.update(req.body);
        var products= ProductModel.get();
        res.render("products",{products, userEmail: req.session.userEmail});
    }    

    // delete product
    deleteProduct(req,res,next){
        const id= req.params.id;
        const ProductFound= ProductModel.getById(id);
        if(!ProductFound){
           return res.status(401).send('Product not found');
        }
        ProductModel.delete(id);
        var products= ProductModel.get();
        res.render("products",{products, userEmail: req.session.userEmail});
    }

    

}