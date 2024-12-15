export const setLastVisit=(req,res,next)=>
{
    // if cookie is set add a local variable add with last time visit data.
    if(req.cookies.lastVisit){
        res.locals.lastVisit= new Date(req.cookies.lastVisit).toLocaleString();
    }
    // if cookie is not set 
    res.cookie('lastVisit', new Date().toISOString(),{
        maxAge: 2*24*60*60*1000,
    });
    next();

}