import { object, string } from "yup";

const payload = {
    body: object({
        departmentInfo: object({
            name: string().required("Department Info Name is required"),
            apiKey: string().required("Department Info APIKey is required")
        }),
        departmentContactPerson: object({
            name: string().required("Department Contact Person Name is required"),
            email: string().required("Department Contact Person Email is required"),
            telephone: string().required("Department Contact Person Telephone is required")
        })
    }),
};

const params = {
    params: object({
        departmentId: string().required("departmentId is required"),
    }),
};

export const createDepartmentSchema = object({
    ...payload,
});

export const updateDepartmentSchema = object({
    ...params,
    ...payload,
});

export const deleteDepartmentSchema = object({
    ...params,
});
