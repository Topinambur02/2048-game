import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FieldInput from '@/assets/components/FieldInput'
import { useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import { ForgetPasswordType } from '@/assets/types/ForgetPasswordType'
import { ForgetPasswordTouchedType } from '@/assets/types/ForgetPasswordTouchedType'
import { validationSchema } from '@/assets/schemas/ForgetPasswordValidationSchema'
import { useAuth } from '@/assets/hooks/useAuth'

const ForgetPassword = () => {
    const [formData, setFormData] = useState<ForgetPasswordType>({
        email: '',
    })
    const [errors, setErrors] = useState<Partial<ForgetPasswordType>>({})
    const [touched, setTouched] = useState<Partial<ForgetPasswordTouchedType>>({})
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { getToken } = useAuth()

    const handleChange = (field: keyof ForgetPasswordType, value: string) => {
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

    const handleBlur = (field: keyof ForgetPasswordType) => {
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
            const data = {"email": formData.email}
            await getToken(data)
            navigation.navigate('ResetPassword')
        } catch (error) {
            setErrors({
                email: error instanceof Error ? error.message : 'An error occurred',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter email</Text>

            <FieldInput
                type="text"
                isTouched={touched.email}
                error={errors.email}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                onBlur={() => handleBlur('email')}
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator /> : <Text style={styles.buttonText}>Get token</Text>}
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

export default ForgetPassword