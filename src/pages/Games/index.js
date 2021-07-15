
import { UpComing } from "./UpComing";
import { PlayingNow } from "./PlayingNow";

import "./Games.css"

const Games = () => {
    return (
        <div className="games-grid-container">
            <div className="playing-now">
                <PlayingNow />
            </div>
            <div className="up-coming">
                <UpComing />
            </div>
        </div>
    )
}

export default Games;