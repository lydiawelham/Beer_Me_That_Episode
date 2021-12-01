import './App.css'
import { useEffect, useState } from 'react'
import Section from './components/Section'
import Header from './components/Header'


const App = () => {
  // Sets pagination for seasons
  const seasonIncrement = 5;
  const [seasons, setSeasons] = useState(null);
  const [limit, setLimit] = useState(seasonIncrement);
  const [search_text, setSearchText] = useState("");
  //var search_text = "";

  // Sets seasons array from query response in getSeasons.js 
  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getSeasons", {
      method: "POST",
      body: limit
    });
    const responseBody = await response.json();
    setSeasons(responseBody.data.referenceSeasons.values);
  }

  const handleSearch = (search_text_input) => {
    setSearchText(search_text_input);
    //search_text = search_text_input;
    
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  useEffect(() => {
    if(search_text !== "")
    {
      setLimit(100);
    }
    else
    {
      setLimit(seasonIncrement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search_text])

  return (
    <div className="App">

      <Header onSearch={handleSearch} />


      <div className="main-page">
        <div id="meme-link">
          {seasons && (
            <div className="container">
            {Object.values(seasons).map((season, index) => (<Section key={index} season={season.value} searchText={search_text} />
            ))}
            </div>
          )}

          { search_text === "" &&

          <div className="page-end" onMouseEnter={() => {
            setLimit(limit + seasonIncrement)
          }}>
             <svg className="down-button" contentScriptType="text/ecmascript" width="30" zoomAndPan="magnify" contentStyleType="text/css" viewBox="0 0 30 149.999998" height="149.999998" preserveAspectRatio="xMidYMid meet" version="1.0"><path stroke-linecap="butt" transform="matrix(3.766959, 6.524565, -6.49519, 3.75, 4.598513, 39.256021)" fill="none" stroke-linejoin="miter" d="M 0.000149027 0.000218339 L 5.874144 -0.0000600312 " stroke="rgb(100%, 100%, 100%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(-3.790746, 6.510773, -6.48146, -3.77368, 26.630761, 73.343955)" fill="none" stroke-linejoin="miter" d="M 0.000100417 0.000227447 L 5.874227 -0.0000343804 " stroke="rgb(100%, 100%, 100%)" stroke-width="1" strokeOpacity="1" strokeMiterLimit="4"/></svg>
          </div>

          }

        </div>
        <div className="footer">
          <p className="footer-text">Content credit goes to NBC Universal and relevant subsidiaries</p>
          <p className="footer-text">© Lydia Welham 2021 | With special thanks to Ania Kubow</p>
        </div>
      </div>
    </div>
  )
}

export default App;