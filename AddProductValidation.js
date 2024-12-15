// create middleware for addProduct validating without express validator package
// now we use 
/*const addProductValidateRequest=(req,res,next)=>{
    const {name, price, imageUrl}= req.body;
    let errors=[];
    if(!name || name.trim()==''){
        errors.push("Name is Required");
    }
    if(!price || price<1){
        errors.push("Price should be positive");
    }
    // for imageUrl we have in built function in JS
    try{
        const validUrl= new URL(imageUrl);
    }catch(err){
        errors.push("Invalid URL");
    }
    // it to add product client side to show message
    
    // Now we use express validator package for validation
    // count if there is errors or not and if have so send
    if(errors.length>0)
        {
            return res.render('addProduct',{
                errorMessage:errors[0],
            });
        }
        next();
    };*/

//********************************************* */
import {body, validationResult,} from  'express-validator';

const addProductValidateRequest= async(req,res,next)=>
{
    console.log(req.body);// checking that code work properly
    
    // step 1: set the rules
    const rules=[
        body('name').notEmpty().withMessage('Name is Required'),

        body('price').isFloat({gt : 0}).withMessage('Price should be positive'),

        body('imageUrl').custom((value, { req })=>{
            if (!req.file){
                throw new Error('Image is required');
            }
            return true;
        }),
    ];

    //step 2: run those rules
    await Promise.all(
        rules.map((rule)=>rule.run(req))
    );

    // 3. check if there are any errors after running the rules.
    var validationErrors= validationResult(req);
    console.log(validationErrors);

    // 4. if errors , return the error message
    if(!validationErrors.isEmpty()){
        return res.render('addProduct',{
            errorMessage:
            validationErrors.array()[0].msg,
        });
    }
    next();

}

// now we export it to index.js
export default addProductValidateRequest;