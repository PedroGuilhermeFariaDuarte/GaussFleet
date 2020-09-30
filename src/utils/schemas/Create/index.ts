import * as Yup from "yup"

export default Yup.object().shape({
  email: Yup.string().email().required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  avatar: Yup.string().required()
})
