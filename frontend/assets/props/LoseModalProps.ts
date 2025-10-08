export interface LoseModalProps {
    showLoseModal: boolean
    setShowLoseModal: (show: boolean) => void
    initializeBoard: () => void
    onClose: () => void
}