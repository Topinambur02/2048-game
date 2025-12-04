import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { LoginFormType } from '@/assets/types/LoginFormType'
import { validationSchema } from '@/assets/schemas/LoginValidationSchema'
import { LoginFormTouchedType } from '@/assets/types/LoginFormTouchedType'
import FieldInput from '@/assets/components/FieldInput'
import { useNavigation } from '@react-navigation/native'
import { IndexScreenNavigationProp } from '@/assets/props/IndexScreenNavigationProp'
import { styles } from '@/assets/styles/LoginStyles'
import { useAuth } from '@/assets/hooks/useAuth'

const Login = () => {
    const [formData, setFormData] = useState<LoginFormType>({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<Partial<LoginFormType>>({})
    const [touched, setTouched] = useState<Partial<LoginFormTouchedType>>({})
    const navigation = useNavigation<IndexScreenNavigationProp>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { login } = useAuth()

    const handleChange = (field: keyof LoginFormType, value: string) => {
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

    const handleBlur = (field: keyof LoginFormType) => {
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
            await login(formData.email, formData.password)
            navigation.navigate('index')
        } catch (error) {
            setErrors({
                password: error instanceof Error ? error.message : 'An error occurred',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>

            <View style={styles.form}>
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

                <FieldInput
                    type="password"
                    isTouched={touched.password}
                    error={errors.password}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    onBlur={() => handleBlur('password')}
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? <ActivityIndicator /> : <Text style={styles.buttonText}>Sign in</Text>}
                </TouchableOpacity>
            </View>

            <Text style={styles.linkToReg}>
                If you do not have an account, you can register it by
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                    {' '}
                    link
                </Text>
            </Text>

            <Text style={styles.linkToReg}>
                If you forgot your password, you can reset it
                <Text style={styles.link} onPress={() => navigation.navigate('ForgetPassword')}>
                    {' '}
                    link
                </Text>
            </Text>
        </View>
    )
}

export default Login
