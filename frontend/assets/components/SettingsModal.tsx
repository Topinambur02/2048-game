import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useContext } from 'react'
import { SettingsModalProps } from '../props/SettingsModalProps'
import { styles } from '../styles/SettingsModalStyles'
import VolumeSvg from '../svgs/VolumeSvg'
import { VolumeContext } from '../contexts/VolumeContext'
import Slider from '@react-native-community/slider'

const SettingsModal = ({ showSettingsModal, setShowSettingsModal }: SettingsModalProps) => {
    const { volume, setVolume } = useContext(VolumeContext)

    return (
        <Modal
            visible={showSettingsModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowSettingsModal(false)}
        >
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowSettingsModal(false)}>
                <View style={styles.modalContent}>
                    <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                        <Text style={styles.modalTitle}>Settings</Text>

                        <View style={styles.soundSetting}>
                            <VolumeSvg />
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                value={volume}
                                onValueChange={setVolume}
                                minimumTrackTintColor="#F59663"
                                maximumTrackTintColor="#C7C7CC"
                                thumbTintColor="#F59663"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default SettingsModal
