import React, {useState, useContext} from 'react';
import useHttp from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

function CreatePage() {
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const navigate = useNavigate();


  const handlePress = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        navigate(`/detail/${data.link._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="flex flex-col w-10/12 items-center mx-auto mt-20">
      <div className="card lg:card-side card-bordered bg-gray-600 min-w-[50%]">
        <div className="card-body">
          <h2 className="card-title mx-auto">Enter your link</h2> 
          <div className="form-control">
            {/* <label htmlFor="link" className="label">
              <span className="label-text">Enter your link</span>
            </label>  */}
            <input 
              type="text" id="link"
              placeholder="Paste your link" 
              className="input input-primary input-bordered"
              onChange={e => setLink(e.target.value)} value={link}
              onKeyPress={handlePress}
            />
          </div>  
          <p className='text-xs mx-auto mt-5 opacity-50'>(press 'Enter' to proceed)</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
