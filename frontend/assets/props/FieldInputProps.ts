import { BlurEvent } from 'react-native'

export interface FieldInputProps {
    value: string
    type: 'text' | 'password'
    placeholder: string
    isTouched: boolean | undefined
    error: string | undefined
    onChangeText: (text: string) => void
    onBlur: (e: BlurEvent) => void
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters'
}
