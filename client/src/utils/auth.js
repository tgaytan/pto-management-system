import { jwtDecode } from 'jwt-decode'

class AuthService {
    getToken() {
        return localStorage.getItem('token')
    }

    login(token) {
        localStorage.setItem('token', token)
        window.location.assign('/')
    }

    loggedIn() {
        const token = this.getToken()
        return token ? true : false
    }

    getProfile() {
        return jwtDecode(this.getToken())
    }

    logout() {
        localStorage.removeItem('token')
        window.location.reload()
    }
}

export default new AuthService()