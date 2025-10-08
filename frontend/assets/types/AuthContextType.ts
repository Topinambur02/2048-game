import { RegisterDataType } from "./RegisterDataType";
import { UserType } from "./UserType";

export interface AuthContextType {
    user: UserType | null;
    users: UserType[] | null
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterDataType) => Promise<void>;
}