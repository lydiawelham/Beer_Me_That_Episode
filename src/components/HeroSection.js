import {useState, useEffect} from 'react'

const HeroSection = () => {
const [episode, setEpisode] =useState(null);
    const pageState = null;
    const pageSize = 25;

    const fetchData = async () => {
        const response = await fetch("/.netlify/functions/getEpisodes", {
            method: "POST",
            body: JSON.stringify( { season: "Three", pageState: pageState, pageSize: pageSize })
        });
        const responseBody = await response.json();
        const episodes = responseBody.data.memes_by_season.values;
        setEpisode(episodes[Math.floor(Math.random() * episodes.length)]);
        console.log(episodes);
      }
     
    useEffect(() => {
    fetchData()
    }, [])

    return (
        <>
        {episode && (
            <div className="hero">
                <a href={episode.netflix_link} target="_blank">
            <img className="hero-meme" src={episode.meme_img} alt={episode.alt_text} />
            </a>

            <div className="info-section">
                <h3 className="hero-name">{episode.episode_name}</h3>
                <div className="button-section">
                    <div className="button-play">
                        <span>Play</span>
                    </div>
                </div>
            </div>

            </div>
        
        )}
        </>
    )
}

export default HeroSection