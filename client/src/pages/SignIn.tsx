import { useState } from 'react'
import Headers from '../components/Headers'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   const user_id = localStorage.getItem("user_id");
  //   const token = localStorage.getItem("token");
  //   if(user && user_id && token) {
  //     navigate("/dashboard");
  //   }
  // })
  

  const handleSubmit = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/arxiv/user/signin", {
            username: username,
            password: password
        });

        console.log("Response:", response.data);

        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", username);
        localStorage.setItem("user_id", response.data.user.id);

        // Navigate to home page or dashboard
        navigate("/dashboard");
      } catch (error) {
        console.log("Error:", error);
      }
  };


  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='bg-blue-200 h-min-96 w-80 border-4 border-blue-700 rounded-3xl'>
          <div className='p-2 m-2'>
            <Headers label={"Sign In"} />
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
              Don't have Account? 
            </div>
            <div className='font-semibold'>
              <NavLink to="/signup" style={({ isActive }) => ({
                color: isActive ? "green" : "blue",
              })} > Sign Up </NavLink>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignIn
