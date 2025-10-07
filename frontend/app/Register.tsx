import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FieldInput from '@/assets/components/FieldInput'
import { RegisterFormType } from '@/assets/types/RegisterFormType'
import { RegisterFormTouchedType } from '@/assets/types/RegisterFormTouchedType'
import { validationSchema } from '@/assets/schemas/RegisterValidationSchema'
import { styles } from '@/assets/styles/RegisterStyles'
import { useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import { useAuth } from '@/assets/hooks/useAuth'

const Register = () => {
    const [formData, setFormData] = useState<RegisterFormType>({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Partial<RegisterFormType>>({})
    const [touched, setTouched] = useState<Partial<RegisterFormTouchedType>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const { register } = useAuth()

    const handleChange = (field: keyof RegisterFormType, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const handleBlur = (field: keyof RegisterFormType) => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }))

        validationSchema.validateAt(field, formData)
            .then(() => {
                setErrors(prev => ({
                    ...prev,
                    [field]: undefined
                }))
            })
            .catch(err => {
                setErrors(prev => ({
                    ...prev,
                    [field]: err.message
                }))
            })
    }

    const handleSubmit = async () => {
        await validationSchema.validate(formData, { abortEarly: false })
        setIsSubmitting(true);
        try {
            const user = {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                bestScore: 0,
                audio_volume: 50
            }
            await register(user)
            navigation.navigate('Login')
        } catch (error) {
            setErrors({
                email: error instanceof Error ? error.message : 'An error occurred'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Регистрация</Text>

            <View style={styles.form}>
                <FieldInput
                    type='text'
                    isTouched={touched.email}
                    error={errors.email}
                    placeholder='Email'
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    onBlur={() => handleBlur('email')}
                    autoCapitalize='none'
                />

                <FieldInput
                    type='text'
                    isTouched={touched.username}
                    error={errors.username}
                    placeholder='Username'
                    value={formData.username}
                    onChangeText={(value) => handleChange('username', value)}
                    onBlur={() => handleBlur('username')}
                    autoCapitalize='none'
                />

                <FieldInput
                    type='password'
                    isTouched={touched.password}
                    error={errors.password}
                    placeholder='Password'
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    onBlur={() => handleBlur('password')}
                    autoCapitalize='none'
                />

                <FieldInput
                    type='password'
                    isTouched={touched.confirmPassword}
                    error={errors.confirmPassword}
                    placeholder='Confirm password'
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    autoCapitalize='none'
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {
                        isSubmitting
                            ?
                            <ActivityIndicator />
                            :
                            <Text style={styles.buttonText}>Зарегистрировать</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register