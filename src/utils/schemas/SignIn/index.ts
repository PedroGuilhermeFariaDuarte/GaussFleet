import { min } from "react-native-reanimated"
import * as Yup from "yup"

export default Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required()
})
