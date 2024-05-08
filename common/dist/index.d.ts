import zod from "zod";
export declare const signupInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
    aboutuser: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
    aboutuser: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    aboutuser: string;
    name?: string | undefined;
}>;
export type SignupInput = zod.infer<typeof signupInput>;
export declare const signinInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = zod.infer<typeof signinInput>;
export declare const createblog: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type Createblog = zod.infer<typeof createblog>;
export declare const udateblog: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type Udateblog = zod.infer<typeof udateblog>;
