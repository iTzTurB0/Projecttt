import React,{useState} from 'react';
import Layout from './../../components/Layout/Layout';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState(""); 
    const [auth,setAuth] = useAuth();
    
    const navigate = useNavigate();
    
//form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/v1/auth/login',
      {email,password});
      if(res && res.data.success){
        toast.success("Register Successfully please login");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate('/');
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
       console.log(error);
       toast.error('Something went wrong'); 
    }
};
  return (
        <Layout title="Login - Ecommerce App">
        <div className='form-container'>
        <h4>Login Page</h4>
        <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
        placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" id="exampleInputPassword1" 
        placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
        </div>
    </Layout>
  )
};

export default Login;