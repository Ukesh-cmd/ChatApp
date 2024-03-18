const isLogin = async(req, res, next)=>{
    try{
        if(req.session.user){}
        else{
            res.redirect('/')
        }
        next();
    }catch(error){
        consle.log(error.message);
    }
}

const isLogout = async(req, res, next)=>{
    try{
        if(req.session.user){
            res.redirect('/dashboard');
        }
        next();
        
    }catch(error){
        consle.log(error.message);
    }
}

module.exports ={
    isLogin,
    isLogout
}