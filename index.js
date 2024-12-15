import express from 'express';
import ProductController from './src/controller/products.controller.js';
import path from 'path';
import ejsLayout from 'express-ejs-layouts';
import addProductValidateRequest from './src/middleware/AddProductValidation.js';
import exp from 'constants';
import { uploadFile } from './src/middleware/file-upload.middleware.js';
import UserController from './src/controller/user.controller.js';
import  session  from 'express-session';
import { auth } from './src/middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';

const server=express();

// set cookie Parser
server.use(cookieParser());

// it is use to public folder main.js in index.js
server.use(express.static('public'));

// create session
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false},
}));

// parse form data
server.use(express.urlencoded({extended: true}));

// set up view engine settings
server.set("view engine", "ejs");
//path of views
server.set("views",path.join(path.resolve(), "src", "views"));

server.use(ejsLayout);

// create instance of ProductController
const productController = new ProductController();

 // create instance of userController
const userController= new UserController();

// get register page
server.get('/register', userController.getRegister);
// post register
server.post('/register',userController.postRegister);

// get login page
server.get('/login', userController.getLogin);
// post login
server.post('/login',userController.postLogin);

server.get('/',setLastVisit ,auth,(productController.getProducts));
server.use(express.static('src/views'));
    //res.send("welcome to inventory app");

// get new product form
server.get('/new',auth,(productController.getAddForm));

// add new product
server.post('/',auth, uploadFile.single('imageUrl'), addProductValidateRequest, (productController.addNewProduct));

//view of update existing product
server.get('/update-product/:id',auth,(productController.updateProductView));// NOTE:- (:id) this id is use to render the product details 

// Post update existing product
server.post('/update-product',auth,(productController.PostUpdateProduct));

// delete product
server.post('/delete-product/:id',auth,productController.deleteProduct);

//logout
server.get('/logout',userController.logout);


server.listen(3100);
console.log("3100 port is working ");