import { AllBets } from "./AllBets"

import "./Bets.css"

const Bets = () => {

    return (
        <div className="bets-grid-container">
            <div className="popular-bets">

            </div>

            <div className="all-bets">
                <AllBets />
            </div>

            <div className="existing-bets">

            </div>
        </div>
    )
}

export default Bets;