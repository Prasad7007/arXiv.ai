import { useState } from 'react'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import axios from "axios";
function Summerizer() {
  const [text, setText] = useState("");
  const [summery, setSummery] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/arxiv/user/summerize",{
        data: text
      });

      setSummery(response.data);
    }
    catch(error) {
      console.log("Error:", error);
    }
  }
  
  return (
    <div>
      <div className='flex justify-center'>
        <div className='mt-16'>
          <InputBox type={"text"} placeholder={"Summerize"} onChange={(e) => setText(e.target.value)}/>
          <Button type={"submit"} label={"Submit"} onClick={handleClick}/>
        </div>
      </div>
      {summery && <div className='flex- justify-center mt-16 '>
        <div className='bg-slate-400 h-min-96 mx-32 border-4 border-blue-500 text-left text-wrap p-8 text-white font-medium text-lg rounded-3xl'>
          {summery}
        </div>
      </div>}
    </div>
  )
}

export default Summerizer
