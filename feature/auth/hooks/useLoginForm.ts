import { ILogin } from "../models/ILogin"
import zod from 'zod'
import Toast from 'react-native-toast-message';
import { router } from "expo-router";

export const useLoginForm = () => {

    const initialValues : ILogin = {
        username: '',
        password: ''
    }

    const validationSchema = zod.object({
        username: zod.string().nonempty('El nombre de usuario es requerido'),
        password: zod.string().nonempty('La contraseña es requerida')
    })
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async (values: ILogin) => {
    await delay(2000); // Simula 3 segundos de espera
    if (values.username === 'admin' && values.password === 'admin') {
        Toast.show({
            type: 'success',
            text1: 'Inicio de sesión exitoso',
            text2: 'Bienvenido a la aplicación',
        });
        router.push('/home');
    }
    console.log(values);
};

    return {
        initialValues,
        validationSchema,
        onSubmit
    }
}