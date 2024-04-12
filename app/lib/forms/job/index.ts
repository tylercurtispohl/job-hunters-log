import { zfd } from "zod-form-data";
import { z } from "zod";

export const createJobFormSchema = zfd.formData({
  company: zfd.text(z.string()),
  position: zfd.text(z.string()),
  description: zfd.text(z.string().optional()),
  notes: zfd.text(z.string().optional()),
  date: zfd.text(z.string()),
  links: zfd.repeatable(z.array(z.object({ url: z.string() })).min(1)),
});
