import { View, Text, Modal } from 'react-native'
import React from 'react'
import { IndexScreenNavigationProp } from '../props/IndexScreenNavigationProp'
import NavigationButton from './NavigationButton'
import { useNavigation } from '@react-navigation/native'
import { LoseModalProps } from '../props/LoseModalProps'
import { styles } from '../styles/LoseModalStyles'

const LoseModal = ({ showLoseModal, setShowLoseModal, initializeBoard, onClose }: LoseModalProps) => {
    const navigation = useNavigation<IndexScreenNavigationProp>()

    const onRestart = () => {
        setShowLoseModal(false)
        initializeBoard()
        onClose()
    }

    const onMenu = () => {
        setShowLoseModal(false)
        onClose()
        navigation.goBack()
    }

    const handleClose = () => {
        setShowLoseModal(false)
        onClose()
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={showLoseModal}
            onRequestClose={handleClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Game Over!</Text>
                    <Text style={styles.modalText}>No more moves available</Text>
                    <View style={styles.modalButtons}>
                        <NavigationButton text='RESTART' func={onRestart} />
                        <NavigationButton text='MENU' func={onMenu} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LoseModal