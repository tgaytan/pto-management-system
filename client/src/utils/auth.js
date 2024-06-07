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
        const token = this.getToken()

        if (token) {
            const profile = jwtDecode(token)
            const expired = (profile.exp - profile.iat) > (8 * 60 * 60) ? true : false //checking if the difference between expired time and issue-at time is mroe than 8 hours. the units of these times are seconds

            if (expired) {
                window.location.assign('/login')
                return
            }

            return profile
        }

        return;
    }

    logout() {
        localStorage.removeItem('token')
        window.location.reload()
    }
}

export default new AuthService()