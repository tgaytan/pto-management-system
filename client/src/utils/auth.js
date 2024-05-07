import decode from 'jwt-decode'

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
        return decode(this.getToken())
    }

    logout() {
        localStorage.removeItem('token')
        window.location.reload()
    }
}

export default new AuthService()