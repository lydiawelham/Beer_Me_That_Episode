import { useState } from 'react'

//Card displays individual episode data (images, episode name, alt text and netflix link)

const Card = ({episode}) => {
    const [isShown, setIsShown] = useState(false)
    return (
        <div className="card"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            {!isShown && 
            (<a href={episode.netflix_link} target="_blank">
            <img className="Meme-img" src={episode.meme_img} alt={episode.alt_text} />
            </a>)}

            {isShown && 
            (
            <>
            <a className="Alt-text" href={episode.netflix_link} target="_blank">
            <img className="Meme-img" src={episode.meme_img} alt={episode.alt_text} />
            </a>
            <div className="info-box">
                <p>{episode.episode_name}</p>
            </div>
            </>
            )}


        </div>
    )
}

export default Card