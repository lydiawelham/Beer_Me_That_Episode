import { useEffect, useState} from 'react'
import Card from './Card'
import right_arrow from './right_arrow.png'

const Section = ({ season }) => {
const [episodes, setEpisodes] = useState(null);
const [pageState, setPageState] = useState(null);
//sets episodes pagination limit to five per scroll
const pageSize = 5;

    //Populates episodes array and collects next pageState for pagination
    const fetchData = async () => {
        const response = await fetch("/.netlify/functions/getEpisodes", {
            method: "POST",
            body: JSON.stringify( { season: season, pageState: pageState, pageSize: pageSize })
        });
        const responseBody = await response.json();
        setEpisodes(responseBody.data.memes_by_season.values);
        setPageState(responseBody.data.memes_by_season.pageState);
      }
    
      useEffect(() => {
        fetchData()
      }, [])

    return (
        <>
        <h2 id={season}>{season}</h2>
        {episodes && (
            <div className="episode-section">
                {episodes.map((episode, index) => (
                <Card key={index} episode={episode}/>
                ))}
                <div className="more-button" onClick={() => {
                    setPageState(pageState)
                    fetchData()
                }}>
                    <img className="more-button" src={right_arrow}/>
                </div>
            </div>
        )}
        </>
    )
}

export default Section

