import React, { useEffect, useRef, useState } from 'react'
import bookmarksolid from "./../assets/bookmark-solid.svg"
import axios from 'axios'
function BookmarkCard({props, bookmarkid, onRemove}) {
    const [res, setRes] = useState();

    console.log("Bookmark: ",props);
    console.log("bookmark ids:", bookmarkid);

    const handleClick = () => {
        const deleteBookmark = async () => {
            console.log("paper_id:", bookmarkid);
            const response = await axios.delete("http://localhost:3000/api/arxiv/user/deleteUserBookmarks", {
                data: {bookmark_id: parseInt(bookmarkid)}
            })
            setRes(response.data);
            console.log("res: ", response.data)
            onRemove(bookmarkid);
        }
        deleteBookmark();
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
                <img src={bookmarksolid} alt="bookmark" className="w-8 h-8" onClick={() => handleClick()}/>
            </div>
        </div>
        
      
        <div className='p-5'>
            {props.abstract}
        </div>
    </div>
  )
}

export default BookmarkCard
