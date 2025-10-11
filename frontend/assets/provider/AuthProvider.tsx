import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import $host from '../http'
import { UserType } from '../types/UserType'
import { RegisterDataType } from '../types/RegisterDataType'
import { AuthContext } from '../contexts/AuthContext'
import { AuthProviderProps } from '../props/AuthProviderProps'

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [users, setUsers] = useState<UserType[] | null>(null)

    useEffect(() => {
        checkAuthStatus()
        getUsers()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')

            if (token) {
                $host.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const response = await $host.get('/users/me')
                setUser(response.data)
            }
        } catch (error) {
            await AsyncStorage.removeItem('userToken')
            throw error
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const params = new URLSearchParams({ username: email, password })
            const response = await $host.post('/auth/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            const { access_token, _ } = response.data

            await AsyncStorage.setItem('userToken', access_token)
            $host.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
            await checkAuthStatus()
        } catch (error) {
            throw error
        }
    }

    const register = async (userData: RegisterDataType) => {
        try {
            const response = await $host.post('/auth/register', userData)
            const { user } = response.data

            setUser(user)
        } catch (error) {
            throw error
        }
    }

    const getUsers = async () => {
        try {
            const response = await $host.get('/users')
            setUsers(response.data)
        } catch (error) {
            throw error
        }
    }

    return <AuthContext.Provider value={{ user, users, login, register }}>{children}</AuthContext.Provider>
}
