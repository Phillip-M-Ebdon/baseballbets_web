import React from "react";
import { ReactComponent as Clyde } from "../../images/discord/Discord-Logo-Color.svg"

import "./Login.css"

const Login = () => {

    const handleDiscordLogin = () => {
        window.open("http://localhost:4000/api/auth/discord/login", "_self")
    }

    return (
        <div>
            <button onClick={handleDiscordLogin} className="login-button login-button-slider">
                <div className="login-button-icon">
                    <Clyde />
                </div>
                <div className="login-button-text">
                    Login with Discord
                </div>
            </button>
        </div>
    )
}

export default Login;