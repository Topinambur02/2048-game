import * as Yup from 'yup'

export const validationSchema = Yup.object({
    token: Yup.string().required('Required field'),
    password: Yup.string().required('Required field').min(4, 'The password must be at least 4 characters long.'),
})