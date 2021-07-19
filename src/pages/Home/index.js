import { useContext } from "react"
import { UserContext } from "../../context/User/User" 
import {
    createTheme,
    ThemeProvider,
    Typography
} from "@material-ui/core"
import "./Home.css"

let homeTheme = createTheme()

homeTheme.typography.h1 = {
    fontSize: "5em",
    fontWeight: "bold",
    fontStyle: "oblique"
}

const Home = () => {

    const [user, setUser] = useContext(UserContext);

    return (
        <div>
            <ThemeProvider theme={homeTheme}>
                <Typography component="h1" variant="h1">
                    Welcome to Baseball Bets { user ? user.username : "" }
                </Typography>
            </ThemeProvider>
        </div>
    )
}

export default Home;