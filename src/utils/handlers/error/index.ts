import { Alert } from "react-native"
import * as Yup from "yup"

function handlerShowAlertMessage(title: string, message: string) {
  Alert.alert(title, `Houve um erro: ${message}`)
}

export default (error: any, formRef?: any | undefined): void => {
  if (error instanceof Yup.ValidationError) {
    const validationErrors: Object = {};
    error?.inner?.forEach((error: Yup.ValidationError) => {
      // @ts-ignore
      validationErrors[ error.path ] = error?.message;
    });

    // @ts-ignore
    if (formRef) formRef?.current?.setErrors(validationErrors);
  } else {
    handlerShowAlertMessage("GaussFleet", error?.message)
  }
}
