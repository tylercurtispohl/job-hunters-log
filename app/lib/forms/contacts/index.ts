import { zfd } from "zod-form-data";
import { z } from "zod";

export const createContactFormSchema = zfd.formData({
  name: zfd.text(z.string()),
  company: zfd.text(z.string()),
  email: zfd.text(z.string().optional()),
  phoneNumber: zfd.text(z.string().optional()),
  nextFollowUpDate: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
  contactType: zfd.text(z.string()),
  // add job application ID references here
});
