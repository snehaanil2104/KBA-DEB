import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey=process.env.SecretKey;

const authenticate=(req,res,next)=>{
    const cookies=req.headers.cookie;
    console.log(cookies);
    const cookie=cookies.split(';')
    for(let cooki of cookie){
        const [name,token]=cooki.trim().split('=')
        if(name=='authToken'){
            const verified= jwt.verify(token,secretKey)
            console.log(verified);
            req.Username=verified.Username;
            req.Role=verified.Role;
            // const role= req.Role;
            break;
            
        }
    }
    next();
  
}
export {authenticate}