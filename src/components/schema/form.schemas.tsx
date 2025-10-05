import * as yup from 'yup'

// login form schema 
export const LoginSchema = yup.object({
email: yup.string().email('please enter a valid email').required('please enter your email'),
password: yup.string().required('please enter your password')
})

// register form schema 
export const RegisterSchema = yup.object({
    full_name: yup.string().required('please enter your full name'),
    email: yup.string().email('please enter a valid email').required('please enter your email'),
    password: yup.string().required('please enter your password'),
    confirmPassword: yup.string().required('please re-enter your password').oneOf([yup.ref('password')], 'your password did not match')
})