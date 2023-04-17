import * as yup from "yup";

export const addressSchema = yup.object({
  id: yup.number().required(),
  addressName: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  description: yup.string().nullable(),
});

export interface Address extends yup.InferType<typeof addressSchema> {}
