import * as yup from "yup";

export const serviceProviderSchema = yup.object({
  id: yup.number().required(),
  phoneNumber: yup.string().required(),
  ratingAvg: yup.number().required(),
  ratingCount: yup.number().required(),
  isActive: yup.boolean().required(),
  verificationStatus: yup.number().required(),
  fk_Address: yup.number().required(),
  fk_UserInfo: yup.number().required(),
});

export interface ServiceProvider
  extends yup.InferType<typeof serviceProviderSchema> {}
