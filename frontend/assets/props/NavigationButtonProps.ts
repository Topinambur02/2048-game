import { GestureResponderEvent } from "react-native"

export interface NavigationButtonProps {
    text: string
    func: (event: GestureResponderEvent) => void
}