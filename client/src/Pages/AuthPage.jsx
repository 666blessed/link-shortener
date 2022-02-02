import React from 'react';
import {useState, useEffect, useContext} from 'react';
import useHttp from '../hooks/http.hook';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/auth.hook';
import {useNavigate} from "react-router-dom";

function AuthPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({email: '', password: ''});
  const {loading, request} = useHttp();
  
  const handleChange = e => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    });
  }


  const handleRegister = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      toast.success(data.message)
    } catch (e) {
      toast.error(e.message);
    }
  }

  const handleLogin = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
      toast.success('logged in');
      navigate('/create');

    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="flex flex-col w-6/12 items-center mx-auto mt-20">
      <h1 className='text-4xl mb-4 font-bold'>Shorten your link</h1>
      <div className="card lg:card-side card-bordered bg-gray-600 min-w-[50%]">
        <div className="card-body">
          <h2 className="card-title">Authorization</h2> 

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label> 
            <input 
              type="text" id="email"
              name="email" placeholder="example@mail.com" 
              className="input input-primary input-bordered"
              onChange={handleChange} value={form.email}
            />
          </div>  

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label> 
            <input 
              type="password" id="password" 
              name="password" placeholder="Enter your password" 
              className="input input-primary input-bordered"
              onChange={handleChange} value={form.password}
            />
          </div>  

          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>Sign In</button> 
            <button className="btn btn-ghost" onClick={handleRegister} disabled={loading}>Sign Up</button>      
          </div>         
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
