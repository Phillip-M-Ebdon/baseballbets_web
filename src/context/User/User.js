import { createContext } from "react"
// default context for user
const defaultContext = {
        user: null,
        setUser: () => {}
}

export const UserContext = createContext(
    defaultContext
);
