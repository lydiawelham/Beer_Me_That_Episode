import './App.css'
import { useEffect, useState} from 'react'
import Section from './components/Section'
import Header from './components/Header'


const App = () => {
  // Sets pagination for seasons
  const seasonIncrement = 5;
  const [seasons, setSeasons] = useState(null);
  const [limit, setLimit] = useState(seasonIncrement);
  
  /*The below function reorders the seasons into numerical order from the alphabetical 
  order provided from the database. This is by no means an ideal way to do it and is a 
  result of poor original design of the reference_list table at the database set-up.
  A consequence is that the pagination limit for the seasons (see above 'seasonIncrement') 
  cannot be less than nine or else the full seasons array with not be populated 
  in order to complete the reordering. 
  const reorderSeasons = (seasons) => {
    const movedSeasonA = seasons[0];
    const movedSeasonB = seasons[7];
    const movedSeasonC = seasons[2];
    const movedSeasonD = seasons[5];
    seasons[0] = seasons[4];
    seasons[4] = seasons[1];
    seasons[1] = seasons[8];
    seasons[8] = seasons[3];
    seasons[5] = seasons[6];
    seasons[7] = movedSeasonA;
    seasons[2] = movedSeasonB;
    seasons[3] = movedSeasonC;
    seasons[6] = movedSeasonD;

    return seasons;
  }*/

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
          
        </div>
      </div>
    </div>
  )
}

export default App;