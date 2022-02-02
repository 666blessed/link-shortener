import React from 'react';

function Loader() {
  return (
    <div className="p-6 space-y-2 artboard phone mx-auto">
        <progress className="progress progress-primary" value="0" max="100"></progress> 
        <progress className="progress progress-primary" value="10" max="100"></progress> 
        <progress className="progress progress-primary" value="40" max="100"></progress> 
        <progress className="progress progress-primary" value="70" max="100"></progress> 
        <progress className="progress progress-primary" value="100" max="100"></progress>
    </div>
  );
}

export default Loader;
