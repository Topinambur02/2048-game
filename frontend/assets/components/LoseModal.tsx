import { View, Text, Modal } from 'react-native'
import React from 'react'
import { IndexScreenNavigationProp } from '../props/IndexScreenNavigationProp'
import NavigationButton from './NavigationButton'
import { useNavigation } from '@react-navigation/native'
import { LoseModalProps } from '../props/LoseModalProps'
import { styles } from '../styles/LoseModalStyles'

const LoseModal = ({ showLoseModal, setShowLoseModal, initializeBoard }: LoseModalProps) => {
    const navigation = useNavigation<IndexScreenNavigationProp>()

    const onRestart = () => {
        setShowLoseModal(false)
        initializeBoard()
    }

    const onMenu = () => {
        setShowLoseModal(false)
        navigation.goBack()
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={showLoseModal}
            onRequestClose={() => setShowLoseModal(false)}
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