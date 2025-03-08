import React, { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import filter from "../assets/filter.svg";
import axios from 'axios';
import PaperCard from '../components/PaperCard';
import TrendChart from '../components/TrendChart';
import HistoryCard from '../components/HistoryCard';
import BookmarkCard from '../components/BookmarkCard';

function Dashboard() {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState(["All"]);
  const [paper, setPaper] = useState([]);
  const [focusRecommendation, setFocusRecommenadtion] = useState(false);
  const [focusTrending, setFocusTrending] = useState(false);
  const [focusHistory, setFocusHistory] = useState(false);
  const [focusBookmarks, setFocusBookmarks] = useState(false);
  const [trend, setTrend] = useState("");
  const [getfilter, setFilter] = useState("");
  const [history, setHistory] = useState([]);
  const [bookmark, setBookmarks] = useState([]);
  const [bookmarkid, setBookmarkId] = useState([]);
  const [bookMarkNumber, setBookMarkNumber] = useState([]);
  useEffect(() => {
    setFocusRecommenadtion(true);
  },[])


  const handleSearch = async () => {
    
    console.log("Searching for:", searchText);
    handleTopicClick(setFocusRecommenadtion);
    const paperIds = await axios.post("http://localhost:8000/api/arxiv/user/search", {
      data: searchText
    })
    const paperArray = paperIds.data.data.map((num) => parseInt(num));
    console.log("paperArray:",paperArray);
    const fetchedPapers = await axios.post("http://localhost:3000/api/arxiv/paper/getPaperByIds", {
      ids: paperArray
    })
    console.log(fetchedPapers.data.data)
    

    if(fetchedPapers.data) {
      setPaper(fetchedPapers.data.data);
      localStorage.setItem("user", "1")
      console.log(localStorage.getItem("user"))
      const storeHistory = await axios.post("http://localhost:3000/api/arxiv/user/storeHistory", {
        user_id: parseInt(localStorage.getItem("user")),
        query: searchText,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString("en-US",{hour12:false}).split(" ")[0],
        filters:  getfilter,
        results_count: fetchedPapers.data.data.length
      })
      if(storeHistory) {
        console.log("History stored...:", storeHistory);
      }
    }
    
    

  };

  useEffect(() => {
    async function fetchHistory() {
      const userHistory = await axios.get("http://localhost:3000/api/arxiv/user/fetchHistory",{
        params: {user_id:localStorage.getItem("user")}
      })
      console.log(userHistory.data.data)
      setHistory(userHistory.data.data)
    }
    fetchHistory()
  },[paper, focusRecommendation, focusHistory, focusBookmarks, focusTrending])

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/arxiv/paper/fetchtrend");
        setTrend(JSON.stringify(response.data)); // Directly set the fetched array
        const data = JSON.stringify(response.data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching trend data:", error);
      }
    };

    fetchTrend();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/arxiv/paper/getallpapers");
        const fetchedPaper = response.data.data;
        setPaper(fetchedPaper);
        console.log("paper: ",fetchedPaper) // Ensure "All" is always present
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchPaper();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/arxiv/paper/categories");
        const fetchedCategories = response.data.data.map(category => category.name);
        setCategories(["All", ...fetchedCategories]); // Ensure "All" is always present
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/arxiv/user/fetchBookmark", {
          params: { user_id: localStorage.getItem("user") },
        });
  
        if (!response.data || !response.data.data.length) {
          console.log("No bookmarks found");
          return;
        }
  
        console.log("bm (raw response):", response.data);
  
        const paper_ids = response.data.data.map((obj) => obj.paper_id);
        setBookmarkId(paper_ids);  // Set only the array of paper IDs

        const book_ids = response.data.data.map((obj) => obj.bookmark_id);
        setBookMarkNumber(book_ids);
  
        console.log("Updated bookmarkid state:", book_ids);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };
  
    fetchBookmark();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);
  
  useEffect(() => {
    const fetchBookmarkedPapers = async () => {
      if (bookmarkid.length === 0) return; // Ensure bookmarkid is updated before making the request
  
      try {
        const fetchedPapers = await axios.post("http://localhost:3000/api/arxiv/paper/getPaperByPaperId", {
          ids: bookmarkid,
        });
  
        console.log("Fetched Bookmarks:", fetchedPapers.data.data);
        setBookmarks(fetchedPapers.data.data);
      } catch (error) {
        console.error("Error fetching bookmarked papers:", error);
      }
    };
  
    fetchBookmarkedPapers();
  }, [bookmarkid, bookMarkNumber, focusRecommendation, focusHistory, focusBookmarks, focusTrending]); // Runs when bookmarkid changes
  

  const handleFilter = async (e) => {
    console.log(e);
    setFilter(e);
    const isTrue = (e != 'All'? e: "")
    const filteredData = await axios.post("http://localhost:3000/api/arxiv/paper/filter", {
      filter: isTrue
    })
    setPaper(filteredData.data.data.slice(0,20));
  }

  const handleTopicClick = (fn) => {
    setFocusRecommenadtion(false)
    setFocusTrending(false)
    setFocusHistory(false)
    setFocusBookmarks(false)
    fn(true)
  }

  const handleBookmarkDelete = (deleteBookmarkId) => {
    const updatedBookmarkId = bookMarkNumber.filter((_, index) => bookMarkNumber[index] != deleteBookmarkId)
    const updatedPaperId = bookmarkid.filter((_, index) => bookMarkNumber[index] != deleteBookmarkId)
    setBookMarkNumber(updatedBookmarkId);
    setBookmarkId(updatedPaperId);
  }

  return (
    <div>
      <div className="p-6">
        {/* Search Box */}
        <div className='flex items-center justify-center mt-10 space-x-2'>
          <InputBox 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => setSearchText(e.target.value)} 
          />
          <Button type="submit" label="Search" onClick={handleSearch} />
        </div>

        
        <div className='mt-5 flex items-center justify-center space-x-3 p-3'>
          <img src={filter} alt="Filter icon" className="w-6 h-6" />
          <select 
            name="filter" 
            className='bg-white text-black-700 border-2 border-blue-500 rounded-lg px-3 py-2 h-10 w-56 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(e) => (handleFilter(e.target.value))}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className='flex justify-evenly mt-5'>
          <button className={`text-xl font-sans p-1 m-1 ${focusRecommendation ? 'border-b-4 border-blue-700': 'text-gray-400' }`} onClick={() => {handleTopicClick(setFocusRecommenadtion)}}>
            Recommendation
          </button>
          <button className={`text-xl font-sans p-1 m-1 ${focusTrending ? 'border-b-4 border-blue-700': 'text-gray-400' }`} onClick={() => {handleTopicClick(setFocusTrending)}}>
            Trending
          </button>
          <button className={`text-xl font-sans p-1 m-1 ${focusHistory ? 'border-b-4 border-blue-700': 'text-gray-400' }`} onClick={() => {handleTopicClick(setFocusHistory)}}>
            History
          </button>
          <button className={`text-xl font-sans p-1 m-1 ${focusBookmarks ? 'border-b-4 border-blue-700': 'text-gray-400' }`} onClick={() => {handleTopicClick(setFocusBookmarks)}}>
            Bookmarks
          </button>
        </div>
      </div>

      {focusRecommendation? 
        <div>
          {paper.map((obj , index) => <div key={index}>{<PaperCard props={obj} />}</div>)}
        </div>
      : ""}

      {focusTrending ? 
        <div className='m-16 p-5 py-10 border-4 rounded-lg border-blue-700'>
          <TrendChart trend={trend} />
        </div>
      : ""}

      {focusHistory ? 
        <div>
          {history.map((obj, index) => <div key={index} >{<HistoryCard props={obj} />}</div>)}
        </div>
      : ""}

      {focusBookmarks ? 
        <div>
          {bookmark.map((obj, index) => <div key={index}>{<BookmarkCard props={obj} bookmarkid={bookMarkNumber[index]} onRemove={handleBookmarkDelete} />}</div>)}
        </div>
      : ""}


    </div>
    
  );
}

export default Dashboard;
