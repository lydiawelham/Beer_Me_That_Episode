import './App.css'
import { useEffect, useState} from 'react'
import Section from './components/Section'
import Header from './components/Header'


const App = () => {
  // Sets pagination for seasons
  const seasonIncrement = 5;
  const [seasons, setSeasons] = useState(null);
  const [limit, setLimit] = useState(seasonIncrement);

  // Sets seasons array from query response in getSeasons.js 
  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getSeasons", {
      method: "POST",
      body: limit
    });
    const responseBody = await response.json();
    setSeasons(responseBody.data.referenceSeasons.values);
  }

  useEffect(() => {
    fetchData()
  }, [, limit])


  return (
    <div className="App">

      <Header />


      <div className="main-page">
        <div id="meme-link">
          {seasons && (
            <div className="container">
            {Object.values(seasons).map((season, index) => (<Section key={index} season={season.value}/>
            ))}
            </div>
          )}
          <div className="page-end" onMouseEnter={() => {
            setLimit(limit + seasonIncrement)
          }}/>
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