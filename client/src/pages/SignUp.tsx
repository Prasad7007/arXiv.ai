import { useState } from 'react'
import Headers from '../components/Headers'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/arxiv/user/signup`, {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            is_active: true
        });

        console.log("Response:", response.data);

        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("user", response.data.user.username);

        // Navigate to home page or dashboard
        navigate("/");
      } catch (error) {
        console.log("Error:", error);
      }
  };


  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-blue-200 h-min-96 w-80 border-4 border-blue-700 rounded-3xl'>
          <div className='p-2 m-2'>
            <Headers label={"Sign Up"} />
          </div>
          <div className='m-2 flex justify-center'>
            <InputBox type={"text"} placeholder={"First Name"} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className='m-2 flex justify-center'>
            <InputBox type={"text"} placeholder={"Last Name"} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className='m-2 flex justify-center'>
            <InputBox type={"text"} placeholder={"Username"} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='m-2 flex justify-center'>
            <InputBox type={"text"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='flex justify-center'>
            <Button type={"submit"} label={"Submit"} onClick={() => handleSubmit()} />
          </div>
          <div className='flex justify-center mb-2 space-x-1'>
            <div className='font-semibold'>
              Already have account? 
            </div>
            <div className='font-semibold'>
              <NavLink to="/signin" style={({ isActive }) => ({
                color: isActive ? "green" : "blue",
              })} > Sign In </NavLink>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignUp
