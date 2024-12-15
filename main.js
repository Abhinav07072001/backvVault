function deleteProduct(id){
    const result= confirm("are you sure you wanna delete it");
    if(result){
        // fetch api now of delete product
        fetch("/delete-product/" + id,{
            method:"POST",
        }).then((res)=>{
            if(res.ok){
                window.location.href='/';
            }
        });
    }
}