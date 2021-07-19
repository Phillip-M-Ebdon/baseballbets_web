import { api } from "./baseInstance"

export class MLBApi {

    api = axios.create({
        baseURL: "http://localhost:4000/api",
    });

   /**
     * Fetch the ladder, consisting of teams with their total wins, loses, and their wins/loses in last ten games
     * includes names
     */
    // getLadder = () => {
    //     this.api.get({
    //         url: "ladder"
    //     })
    // }
    connection = api;

    logout = async () => {
        try {
            const res = await this.connection.delete("/api/auth/logout");
            return res.data;
        } catch (e) {
            return null;
        }
    }

    getUser = async () => {
        try {
            const res = await this.connection.get("/api/users/me")
            if (res.status === 200) {
                console.log(res)
                // returned user, provide data
                return res.data;
            } else {
                // not logged in or other error
                return null
            }
        } catch (e) {
            console.log(e)
            return null
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