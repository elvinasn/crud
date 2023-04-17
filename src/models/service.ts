import * as yup from "yup";

export const serviceSchema = yup.object({
  id: yup.number().required(),
  price: yup.number().required(),
  duration: yup.number().required(),
  serviceType: yup.number().required(),
  fk_ServiceProvider: yup.number().required(),
});

export interface Service extends yup.InferType<typeof serviceSchema> {}
