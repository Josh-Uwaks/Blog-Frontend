import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/users/'
// const BASE_URL = 'https://uwaksblog.onrender.com/api/users/'

const register = async (userData) => {
    const response = await axios.post(BASE_URL + 'registration', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(BASE_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
    
}

const advancedFetch = {
    register,
    login,
    logout
}

export default advancedFetch