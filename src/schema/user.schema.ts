import { object, ref, string } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/, "Password should contains Latin letters (Uppercase and LowerCase), Numbers and one special character."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match"
        ),
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});

export const createUserSessionSchema = object({
    body: object({
        password: string()
            .required("Password is required")
            .min(8, "Password is too short - should be 8 chars minimum."),

        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});
