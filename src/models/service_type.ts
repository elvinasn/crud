import * as yup from "yup";

export const serviceTypeSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
});

export interface ServiceType extends yup.InferType<typeof serviceTypeSchema> {}
