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
        <Modal animationType="fade" transparent={true} visible={showWinModal} onRequestClose={handleClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Congratulations!</Text>
                    <Text style={styles.modalText}>You have reached tile {WIN_NUMBER}!</Text>

                    <TouchableOpacity style={[styles.modalButton, styles.newGameButton]} onPress={handleNewGame}>
                        <Text style={styles.buttonText}>New game</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default WinModal
