import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { styles } from '../styles/WinModalStyles'
import { WinModalProps } from '../props/WinModalProps'
import { WIN_NUMBER } from '../constants/constants'

const WinModal = ({ showWinModal, setShowWinModal, initializeBoard, onClose }: WinModalProps) => {
    const handleNewGame = () => {
        setShowWinModal(false)
        initializeBoard()
        onClose()
    }

    const handleClose = () => {
        setShowWinModal(false)
        onClose()
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showWinModal}
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Поздравляем!</Text>
                    <Text style={styles.modalText}>
                        Вы достигли плитки {WIN_NUMBER}!
                    </Text>

                    <TouchableOpacity
                        style={[styles.modalButton, styles.newGameButton]}
                        onPress={handleNewGame}
                    >
                        <Text style={styles.buttonText}>Новая игра</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default WinModal