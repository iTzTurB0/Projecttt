import React,{useState} from 'react';
import Layout from './../../components/Layout/Layout';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css';

const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/v1/auth/register',
      {name,email,password,phone,address});
      if(res && res.data.success){
        toast.success("Register Successfully please login");
        navigate('/login');
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
       console.log(error);
       toast.error('Something went wrong'); 
    }
  };

  
  return (
<Layout title="Register - Ecommerce App">
    <div className='form-container'>
    <h4>Register Page</h4>
    <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
    placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required></input>
  </div>
  <div class="mb-3">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
    placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
  </div>
  <div class="mb-3">
    <input type="password" class="form-control" id="exampleInputPassword1" 
    placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
  </div>
  <div class="mb-3">
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
    placeholder='Enter Your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
  </div>
  <div class="mb-3">
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
    placeholder='Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)} required></input>
  </div>
  <button type="submit" class="btn btn-primary">Register</button>
</form>
    </div>
</Layout>
  )
};

export default Register;