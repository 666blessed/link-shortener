import React from 'react';

function LinkCard({link}) {
  return ( 
    <div className="card shadow-lg card-bordered w-6/12 mx-auto mt-10 bg-gray-500">
        <div className="card-body mx-auto">
            <h2 className="card-title">Link</h2> 
            <p>Your link: <a className='text-indigo-300 hover-link' href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p>
            <p>Origin: <a className='text-indigo-300 hover-link' href={link.from} target="_blank" rel="noreferrer">{link.from}</a></p>
            <p>Amount of clicks: <strong>{link.clicks}</strong></p>
            <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    </div>
  );
}

export default LinkCard;
