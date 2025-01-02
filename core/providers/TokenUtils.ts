import SessionStorage from 'react-native-session-storage';

export const setToken = (token: string) => {
    SessionStorage.setItem('access_token', token)
}

export const getToken = () => {
    return SessionStorage.getItem('access_token')
}

export const removeToken = () => {
    SessionStorage.removeItem('access_token')
}
