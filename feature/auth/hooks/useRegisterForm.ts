import { IRegister } from "../models/IRegister";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { AuthDataSourceImpl } from "../service/AuthDataSource";

export const useRegisterForm = () => {
  const authDataSource = new AuthDataSourceImpl();

  const initialValues: IRegister = {
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  };

  const validationSchema = z.object({
    email: z.string().nonempty("El email es requerido").email("Email inválido"),
    username: z
      .string()
      .nonempty("El nombre de usuario es requerido")
      .min(3, "Mínimo 3 caracteres"),
    password: z
      .string()
      .nonempty("La contraseña es requerida")
      .min(6, "Mínimo 6 caracteres"),
    firstName: z.string().nonempty("El nombre es requerido"),
    lastName: z.string().nonempty("El apellido es requerido"),
    phoneNumber: z
      .string()
      .nonempty("El teléfono es requerido")
      .regex(/^\d{10}$/, "Debe ser un número de 10 dígitos"),
    address: z.string().nonempty("La dirección es requerida"),
  });

  const onSubmit = async (values: IRegister) => {
    try {
      const response = await authDataSource.register(values);
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "Bienvenido a la aplicación",
      });
      return response;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error en el registro",
        text2: "Por favor intente nuevamente",
      });
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};
