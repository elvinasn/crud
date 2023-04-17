import * as yup from "yup";

export const userInfoSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  imageUrl: yup.string().required().url(),
});

export interface UserInfo extends yup.InferType<typeof userInfoSchema> {}
