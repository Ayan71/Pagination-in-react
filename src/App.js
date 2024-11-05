import React, { useEffect, useState } from "react";
import "./App.css";
import { url } from "./api";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({ articles: [] });
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;
  
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate page items
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.articles?.slice(firstIndex, lastIndex);

  // Handle button clicks
  const handleNext = () => {
    if(currentPage * itemsPerPage < data.articles?.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <div>
        {currentItems?.map((article, index) => (
          <div className="datashow" key={index}>
            <div>{firstIndex + index + 1}</div>
            <div>{article.author}</div>
            <div>{article.description}</div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handlePrev}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;