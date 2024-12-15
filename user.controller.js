import ProductModel from "../model/products.model.js";
import UserModel from "../model/userModel.js";

export default class UserController{
    getRegister(req, res){
        res.render('register');
    }
    // Post Register
    postRegister(req, res){
        const {name, email, password}= req.body;
        UserModel.add(name, email, password);
        res.render('login', {errorMessage: null});
    }

    getLogin(req,res){
        res.render('login',{ errorMessage: null });
    }

    // post login
    postLogin(req,res){
        const {email, password}=req.body;
        const user= UserModel.isValidUser(email, password);
        if(!user){
            return res.render('login',{
                errorMessage: 'Invalid Credentials',
            });
        }
        req.session.userEmail= email;
        console.log('user authentication', user);
        var products= ProductModel.get();
        res.render('products',{products, userEmail: req.session.userEmail});
    }

    //logout
    logout(req,res){
        res.clearCookie('lastVisit');
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
            

        });
    }

}