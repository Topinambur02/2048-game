import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const $host = axios.create({
    baseURL: 'http://192.168.1.123:8000/api',
})

$host.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('userToken')
        }

        return Promise.reject(error)
    }
)

export default $host
