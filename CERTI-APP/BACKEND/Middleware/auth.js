import jwt from 'jsonwebtoken';
const secretKey='hi';

const authenticate=(req,res,next)=>{
    const cookies=req.headers.cookie;
    console.log(cookies);
    const cookie=cookies.split(';')
    for(let cooki of cookie){
        const [name,token]=cooki.trim().split('=')
        if(name=='authToken'){
            const verified= jwt.verify(token,secretKey)
            console.log(verified);
            req.UserName=verified.UserName;
            req.Role=verified.Role;
            break;
            
        }
    }
    next();
  
}
export {authenticate}