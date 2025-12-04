import { ForgetPasswordType } from './ForgetPasswordType'
import { RegisterDataType } from './RegisterDataType'
import { ResetPasswordType } from './ResetPasswordType'
import { UserType } from './UserType'

export interface AuthContextType {
    user: UserType | null
    users: UserType[] | null
    login: (email: string, password: string) => Promise<void>
    register: (userData: RegisterDataType) => Promise<void>
    getToken: (data: ForgetPasswordType) => Promise<void>
    resetPassword: (data: ResetPasswordType) => Promise<void>
}
