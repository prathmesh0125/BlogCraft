import zod from "zod";
// signup
export const signupInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  name: zod.string().optional(),
  aboutuser:zod.string()
});
// type intrface in zod
export type SignupInput = zod.infer<typeof signupInput>;
// signin
export const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});
export type SigninInput = zod.infer<typeof signinInput>;
// create blog
export const createblog = zod.object({
  title: zod.string(),
  content: zod.string(),
});
export type Createblog = zod.infer<typeof createblog>;
// update blog
export const udateblog = zod.object({
  title: zod.string(),
  content: zod.string(),
  id: zod.string(),
});
export type Udateblog = zod.infer<typeof udateblog>;
