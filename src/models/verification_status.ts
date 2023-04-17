import * as yup from "yup";

export const verificationStatusSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
});

export interface VerificationStatus
  extends yup.InferType<typeof verificationStatusSchema> {}
