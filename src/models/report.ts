import * as yup from "yup";

export const reportSchema = yup.object({
  pet_owner_details: yup.string().required(),
  total_bookings: yup.number().required(),
  average_booking_price: yup.number().required(),
  total_revenue: yup.number().required(),
  average_service_provider_rating: yup.number().required(),
});

export interface Report extends yup.InferType<typeof reportSchema> {}
