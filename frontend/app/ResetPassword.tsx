import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import { ResetPasswordType } from '@/assets/types/ResetPasswordType'
import { ResetPasswordTouchedType } from '@/assets/types/ResetPasswordTouchedType'
import FieldInput from '@/assets/components/FieldInput'
import { validationSchema } from '@/assets/schemas/ResetPasswordValdationSchema'
import { useAuth } from '@/assets/hooks/useAuth'

const ResetPassword = () => {
    const [formData, setFormData] = useState<ResetPasswordType>({
        token: '',
        password: ''
    })
    const [errors, setErrors] = useState<Partial<ResetPasswordType>>({})
    const [touched, setTouched] = useState<Partial<ResetPasswordTouchedType>>({})
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { resetPassword } = useAuth()

    const handleChange = (field: keyof ResetPasswordType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }))
        }
    }

    const handleBlur = (field: keyof ResetPasswordType) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }))

        validationSchema
            .validateAt(field, formData)
            .then(() => {
                setErrors((prev) => ({
                    ...prev,
                    [field]: undefined,
                }))
            })
            .catch((err) => {
                setErrors((prev) => ({
                    ...prev,
                    [field]: err.message,
                }))
            })
    }

    const handleSubmit = async () => {
        await validationSchema.validate(formData, { abortEarly: false })

        setIsSubmitting(true)
        try {
            const data = { token: formData.token, password: formData.password }
            await resetPassword(data)
            navigation.navigate('Login')
        } catch (error) {
            setErrors({
                token: error instanceof Error ? error.message : 'An error occurred',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Reset password</Text>

            <FieldInput
                type="text"
                isTouched={touched.token}
                error={errors.token}
                placeholder="Token"
                value={formData.token}
                onChangeText={(value) => handleChange('token', value)}
                onBlur={() => handleBlur('token')}
                autoCapitalize="none"
            />

            <FieldInput
                type="password"
                isTouched={touched.password}
                error={errors.password}
                placeholder="New password"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                onBlur={() => handleBlur('password')}
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator /> : <Text style={styles.buttonText}>Reset password</Text>}
            </TouchableOpacity>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf8ef',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#F59663',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: '100%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default ResetPassword