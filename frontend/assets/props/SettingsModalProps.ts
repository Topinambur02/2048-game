import { Dispatch, SetStateAction } from "react"

export interface SettingsModalProps {
    showSettingsModal: boolean
    setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}