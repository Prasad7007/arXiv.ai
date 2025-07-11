import bookmarklight from "./../assets/bookmark-regular.svg"
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
type PaperProps = {
    title: string;
    published_date: string;
    abstract: string;
    paper_id: string;
}

function PaperCard({props}: {props: PaperProps}) {

    const user = localStorage.getItem("user_id");

    const handleClick = () => {
        const addBookmark = async () => {
            console.log("user_id:", user);
            console.log("paper_id:", props.paper_id);
            if(user) {
                await axios.post(`${backendUrl}/api/arxiv/user/userBookmarks`, {
                                user_id: parseInt(user),
                                paper_id: `${props.paper_id}`
                })
            }
            
        }
        addBookmark();
    }
  return (
    <div className='flex justify-center'>
        <div className='bg-blue-200 m-5 max-w-3xl border-4 rounded-md border-blue-700'>
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
    </div>
  )
}

export default PaperCard
