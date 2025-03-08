import React from 'react';

function Button({ type, label, onClick }) {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className='p-2 m-2 h-12 w-24 bg-blue-500 text-white border rounded-lg hover:bg-blue-600 transition duration-300'
    >
      {label}
    </button>
  );
}

export default Button;
