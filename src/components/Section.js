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
                    <svg className="more-button" contentScriptType="text/ecmascript" width="30" zoomAndPan="magnify" contentStyleType="text/css" viewBox="0 0 30 149.999998" height="149.999998" preserveAspectRatio="xMidYMid meet" version="1.0"><path stroke-linecap="butt" transform="matrix(3.766959, 6.524565, -6.49519, 3.75, 4.598513, 39.256021)" fill="none" stroke-linejoin="miter" d="M 0.000149027 0.000218339 L 5.874144 -0.0000600312 " stroke="rgb(100%, 100%, 100%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4"/><path stroke-linecap="butt" transform="matrix(-3.790746, 6.510773, -6.48146, -3.77368, 26.630761, 73.343955)" fill="none" stroke-linejoin="miter" d="M 0.000100417 0.000227447 L 5.874227 -0.0000343804 " stroke="rgb(100%, 100%, 100%)" stroke-width="1" stroke-opacity="1" stroke-miterlimit="4"/></svg>
                </div>
            </div>
        )}
        </>
    )
}

export default Section

