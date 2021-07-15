import axios from "axios";

export class MLBApi {

    api = axios.create({
        baseURL: "http://localhost:4000/api",
    });

    /**
     * Fetch the ladder, consisting of teams with their total wins, loses, and their wins/loses in last ten games
     * includes names
     */
    getLadder = () => {
        this.api.get({
            url: "ladder"
        })
    }

    getTeams = () => {
        this.api.get({
            url: "teams"
        })
    }

    getActiveGames = () => {
        this.api.get({
            url: "games/playing"
        })
    }

    getFutureGames = (start, end) => {
        getActiveGames = () => {
            this.api.get({
                url: "games/",
                params: {
                    startDate: start,
                    endDate: end
                }
            })
        }
    
    }

    getPopularBets = () => {
        this.api.get({
            url: "bets/popular"
        })
    }

    getBets = () => {
        this.api.get({
            url: "bets"
        })
    }

}