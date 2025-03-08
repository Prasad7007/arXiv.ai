import React, { useRef, useState } from 'react'
import bookmarklight from "./../assets/bookmark-regular.svg"
import axios from 'axios'
function PaperCard({props}) {

    const user = useRef(localStorage.getItem("user"));

    const handleClick = () => {
        const addBookmark = async () => {
            console.log("user:", user);
            console.log("paper_id:", props.paper_id);
            const response = await axios.post("http://localhost:3000/api/arxiv/user/userBookmarks", {
                user_id: parseInt(user.current),
                paper_id: `${props.paper_id}`
            })
        }
        addBookmark();
    }
  return (
    <div className='bg-blue-200 m-5 border-4 rounded-md border-blue-700'>
        <div>
            <div className="flex justify-between">
                <div className='font-sans font-semibold text-lg m-5'>
                    Title:  {props.title}
                </div>
                <div className="m-5">
                    {props.published_date}
                </div>
            </div>
            <div className='m-5'>
                <img src={bookmarklight} alt="bookmark" className="w-8 h-8" onClick={() => handleClick()}/>
            </div>
        </div>
        
      
        <div className='p-5'>
            {props.abstract}
        </div>
    </div>
  )
}

export default PaperCard
