import React from 'react';

function InputBox({ type, placeholder, onChange }) {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      onChange={onChange}  
      className='border-2 border-blue-500 rounded-lg h-12 w-60 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
    />
  );
}

export default InputBox;
