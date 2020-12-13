import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required(),
  gender: Yup.string().required(),
  budget: Yup.number().min(1).required(),
}).required();
