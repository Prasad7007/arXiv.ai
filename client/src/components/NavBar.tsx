import logo from "../assets/logoipsum-245.svg"
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        navigate("/")
    }
  return (
    <nav className='bg-blue-200 flex justify-between'>
        <div className='flex items-center'>
            <img src={logo} className='p-2 ml-2' />
        </div>
        <div className='flex space-x-4 items-center'>
            <button className='p-5 font-medium text-lg hover:text-blue-500' onClick={() => {navigate("/dashboard")}}>
                Dashboard
            </button>
            <button className='p-5 font-medium text-lg hover:text-blue-500' onClick={() => {navigate("/weekly")}}>
                Weekly
            </button>
            <button className='p-5 font-medium text-lg hover:text-blue-500' onClick={() => {navigate("/summerizer")}}>
                Summerizer
            </button>
            <button className='p-5 font-medium text-lg hover:text-blue-500' onClick={() => {navigate("/aboutus")}}>
                About Us
            </button>
        </div>
        <div className='flex items-center mr-2 p-2'>
            <div className='bg-blue-900 border rounded-full h-12 w-12 text-white flex items-center justify-center' onClick={handleClick}>
                {user?user.charAt(0).toUpperCase(): "A"}
            </div>
        </div>
    </nav>
  )
}

export default NavBar
