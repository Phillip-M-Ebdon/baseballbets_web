import React, { useState, useEffect } from "react"
import { 
  BrowserRouter,
  Route, 
  Switch 
} from 'react-router-dom'
import { Navbar, Footer } from './components';
import { UserContext } from "./context/User/User"
import { Home, Games, Bets, Ladder, Boards, Profile } from './pages/index';
import { MLBApi } from "./api/MLBApi";
import "./App.css"

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const api = new MLBApi();
      const newUser = await api.getUser();
      console.log(newUser)
      setUser(newUser);
    }
    fetchUser();
  }, [])

  return (
    <BrowserRouter>
    <UserContext.Provider value={[user, setUser]}>
      <Navbar />
      <div className="content">
        <Switch >
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/bets">
            <Bets />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/ladder">
              <Ladder />
            </Route>
            <Route path="/boards">
              <Boards />
            </Route>
          </Switch>
      </div>
      <Footer className="Footer"/>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

