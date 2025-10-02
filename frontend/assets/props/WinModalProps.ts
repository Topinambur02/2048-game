import { Dispatch, SetStateAction } from "react"

export interface WinModalProps {
    showWinModal: boolean
    setShowWinModal: Dispatch<SetStateAction<boolean>>
    initializeBoard: () => void
}