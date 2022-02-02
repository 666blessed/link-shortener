import React from 'react';
import {Link} from 'react-router-dom';

function LinksList({links}) {
    if (links.length === 0) {
        return <p className='text-4xl'>You don't have any links yet.</p>
    }

    return (
        <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
                <tr>
                <th>№</th> 
                <th>Origin</th> 
                <th>Short</th> 
                <th>Open</th>
                </tr>
            </thead> 
            <tbody>
            {links.map((link, index) => {
                return (
                <tr key={link._id}>                    
                    <td>{index + 1}</td> 
                    <td>{link.from}</td> 
                    <td>{link.to}</td>
                    <td>
                        <Link className="btn btn-primary" to={`/detail/${link._id}`}>Open</Link>
                    </td>
                </tr>
                )
            })}              
            </tbody>
        </table>
    </div>
  );
}

export default LinksList;
