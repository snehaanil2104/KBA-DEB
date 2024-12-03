import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


const SignupPage = () => {
    const [userName,setUserName] = useState('');
    const [password,setPassword]= useState('');
    const [email,setEmail] = useState('')
    const [userType,setUserType] = useState('user');
    const navigate = useNavigate();

    const signupSubmit = async (e) =>{
        e.preventDefault();
        const userDetails = {
            userName,
            email,
            password,
            userType 
            }
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(userDetails),
            });
            const data = await response.json();
    
            if(res.ok){
                alert('Signup successfull');
                navigate('/login');
            }else{
                alert('Signup failed');
            }
            
        } catch (error) {
            
        }
        
    };   
  return (
    <div className="bg-purple-100 flex items-center justify-center min-h-screen">
  <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
    <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">Sign Up</h2>
    <form onSubmit={signupSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={userName}
          onChange={(e) =>setUserName(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
     
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
     
      <div className="flex items-center justify-between mb-6">
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Sign Up
        </button>
      </div>
      <p className="text-center">
        Already have an account? {' '}
        <Link to="/" className="text-purple-700 hover:underline">Login</Link>
      </p>
    </form>
  </div>
</div>
  )
}

export default SignupPage