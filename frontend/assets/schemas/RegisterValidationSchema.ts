import * as Yup from 'yup'

export const validationSchema = Yup.object({
    username: Yup.string().required('Required field'),
    email: Yup.string().email('Incorrect email address').required('Required field'),
    password: Yup.string().min(4, 'The password must be at least 4 characters long.').required('Required field'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm the password'),
})
