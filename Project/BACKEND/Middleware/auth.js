import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey=process.env.SecretKey;

const authenticate=(req,res,next)=>{                //result of arrow fn stored in the variable authenticate
const cookies= req.headers.cookie;
// req.cookies;                                   //can access cookies from both above types
console.log(cookies);
const cookie=cookies.split(';')
for(let cooki of cookie){
   const [name,token]= cooki.trim().split('=');
   if(name=='authToken'){
   const verified= jwt.verify(token,secretKey);
   console.log(verified);
//    console.log("Username: ",verified.UserName);
    req.UserName=verified.UserName;
    req.Role=verified.Role;
   break;
   }
}
next();

}



export {authenticate};