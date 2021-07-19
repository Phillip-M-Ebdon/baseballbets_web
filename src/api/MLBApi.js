import { api } from "./baseInstance"

export class MLBApi {

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
        

    }

    getTeams = async () => {
        const data = await this.connection.get("/api/teams")
        if (data.status === 200) {
            return data.data;
        }
        return []
    }

    /**
     * Fetch from the API a number of games from a certain offset
     * Essentially a particular page from games that haven't started
     * @param {*} startingFrom - how many games to skip
     * @param {*} numberOf - how many to retrieve
     */
     getGames = async (type, startingFrom=0, numberOf=25, order="ASC", team=undefined) => {
        const data = await this.connection.get("/api/games/pageOf", {
            params: {
                type: type, 
                from: startingFrom,
                count: numberOf,
                order: order,
                team: team ? undefined : team
            }
        })

        if (data.status === 200) {
            return data.data;
        }
        return []
    }

    // getActiveGames = () => {
    //     this.api.get({
    //         url: "games/playing"
    //     })
    // }

    // getFutureGames = (start, end) => {
    //     getActiveGames = () => {
    //         this.api.get({
    //             url: "games/",
    //             params: {
    //                 startDate: start,
    //                 endDate: end
    //             }
    //         })
    //     }
    
    // }

    // getPopularBets = () => {
    //     this.api.get({
    //         url: "bets/popular"
    //     })
    // }

    // getBets = () => {
    //     this.api.get({
    //         url: "bets"
    //     })
    // }

}