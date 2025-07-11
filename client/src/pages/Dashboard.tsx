import { useEffect, useState } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import filter from "../assets/filter.svg";
import axios from 'axios';
import PaperCard from '../components/PaperCard';
import TrendChart from '../components/TrendChart';
import HistoryCard from '../components/HistoryCard';
import BookmarkCard from '../components/BookmarkCard';
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

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

  const token = localStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleSearch = async () => {
    console.log("Searching for:", searchText);
    handleTopicClick(setFocusRecommenadtion);
    const paperIds = await axios.post(`${backendUrl}/api/arxiv/user/search`, {
      data: searchText
    });

    const paperArray = paperIds.data.data.map((num: string) => parseInt(num));
    const fetchedPapers = await axios.post(`${backendUrl}/api/arxiv/paper/getPaperByIds`, {
      ids: paperArray
    });

    if(fetchedPapers.data) {
      setPaper(fetchedPapers.data.data);
      
      await axios.post(`${backendUrl}/api/arxiv/user/storeHistory`, {
        user_id: parseInt(localStorage.getItem("user_id") || "0"),
        query: searchText,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString("en-US",{hour12:false}).split(" ")[0],
        filters:  getfilter,
        results_count: fetchedPapers.data.data.length
      });
    }
  };

  useEffect(() => {
    async function fetchHistory() {
      const userHistory = await axios.get(`${backendUrl}/api/arxiv/user/fetchHistory/${localStorage.getItem("user_id")}`);
      if(userHistory.data.data) {
        setHistory(userHistory.data.data);
      }
    }
    fetchHistory();
  },[paper]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/arxiv/paper/fetchtrend`);
        setTrend(JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching trend data:", error);
      }
    };
    fetchTrend();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/arxiv/paper/getallpapers`);
        setPaper(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchPaper();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/arxiv/paper/categories`);
        const fetchedCategories = response.data.data.map((category: { name: string; }) => category.name);
        setCategories(["All", ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/arxiv/user/fetchBookmark`, {
          params: { user_id: localStorage.getItem("user_id") },
        });

        if (response.data && response.data.data.length) {
          const paper_ids = response.data.data.map((obj: {paper_id: number}) => obj.paper_id);
          setBookmarkId(paper_ids);

          const book_ids = response.data.data.map((obj: {bookmark_id: number}) => obj.bookmark_id);
          setBookMarkNumber(book_ids);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };
    fetchBookmark();
  }, [focusRecommendation, focusHistory, focusBookmarks, focusTrending]);

  useEffect(() => {
    const fetchBookmarkedPapers = async () => {
      if (bookmarkid.length === 0) return;

      try {
        const fetchedPapers = await axios.post(`${backendUrl}/api/arxiv/paper/getPaperByPaperId`, {
          ids: bookmarkid,
        });
        setBookmarks(fetchedPapers.data.data);
      } catch (error) {
        console.error("Error fetching bookmarked papers:", error);
      }
    };
    fetchBookmarkedPapers();
  }, [bookmarkid, bookMarkNumber]);

  const handleFilter = async (e: string) => {
    setFilter(e);
    const isTrue = (e !== 'All' ? e : "");
    const filteredData = await axios.post(`${backendUrl}/api/arxiv/paper/filter`, {
      filter: isTrue
    });
    setPaper(filteredData.data.data.slice(0,20));
  };

  const handleTopicClick = (fn: (e: boolean) => void) => {
    setFocusRecommenadtion(false);
    setFocusTrending(false);
    setFocusHistory(false);
    setFocusBookmarks(false);
    fn(true);
  };

  const handleBookmarkDelete = (deleteBookmarkId: string) => {
    const deleteIdNum = Number(deleteBookmarkId);
    const updatedBookmarkId = bookMarkNumber.filter((_, index) => bookMarkNumber[index] !== deleteIdNum);
    const updatedPaperId = bookmarkid.filter((_, index) => bookMarkNumber[index] !== deleteIdNum);
    setBookMarkNumber(updatedBookmarkId);
    setBookmarkId(updatedPaperId);
  };

  return (
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

      <div className="flex justify-evenly items-center mx-10 my-5 border-b-2 border-gray-300">
        <button 
          className={`text-xl font-sans p-3 ${focusRecommendation ? 'border-b-4 border-blue-700' : 'text-gray-400'}`}
          onClick={() => handleTopicClick(setFocusRecommenadtion)}>
          Recommendation
        </button>

        <button 
          className={`text-xl font-sans p-3 ${focusTrending ? 'border-b-4 border-blue-700' : 'text-gray-400'}`}
          onClick={() => handleTopicClick(setFocusTrending)}>
          Trending
        </button>

        <button 
          className={`text-xl font-sans p-3 ${focusHistory ? 'border-b-4 border-blue-700' : 'text-gray-400'}`}
          onClick={() => handleTopicClick(setFocusHistory)}>
          History
        </button>

        <button 
          className={`text-xl font-sans p-3 ${focusBookmarks ? 'border-b-4 border-blue-700' : 'text-gray-400'}`}
          onClick={() => handleTopicClick(setFocusBookmarks)}>
          Bookmarks
        </button>
      </div>

      {focusRecommendation && (
        <div className="max-w-3xl mx-auto">
          {paper.map((obj, index) => <PaperCard key={index} props={obj} />)}
        </div>
      )}

      {focusTrending && (
        <div className="max-w-3xl mx-auto">
          <TrendChart trend={trend} />
        </div>
      )}

      {focusHistory && (
        <div className="max-w-3xl mx-auto">
          {history.map((obj, index) => <HistoryCard key={index} props={obj} />)}
        </div>
      )}

      {focusBookmarks && (
        <div className="max-w-3xl mx-auto">
          {bookmark.map((obj, index) => <BookmarkCard key={index} props={obj} bookmarkid={bookMarkNumber[index]} onRemove={handleBookmarkDelete} />)}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
