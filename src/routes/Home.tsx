import Search from "../components/Search.tsx";
import {useState} from "react";
import {UserProps} from "../types/users.tsx";
import User from "../components/User.tsx";
import Error from "../components/Error.tsx";
const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null)
    const [error, setError] = useState<boolean>(false)

    const loadUser = async (userName: string) => {
        setError(false)
        setUser(null)
        const response = await fetch(`https://api.github.com/users/${userName}`)
        const data = await response.json()

        if (response.status === 404) {
            setError(true)
            return
        }else {
            const {avatar_url, login, location, followers, following} = data
            const userData: UserProps = {
                avatar_url,
                login,
                location,
                followers,
                following
            }
            console.log(data)
            setUser(userData)
        }
    }

    return (
        <div>
            <Search loadUser={loadUser}/>
            {user && <User {...user}/>}
            {error && <Error/>}
        </div>
    );
}

export default Home;