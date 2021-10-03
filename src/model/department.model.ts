import { Document, model, Schema } from 'mongoose';
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface DepartmentDocument extends Document
{
    user: UserDocument["_id"];
    departmentInfo: DepartmentInfo;
    departmentContactPerson: DepartmentContactPerson;
    createdAt: Date;
    updatedAt: Date;
}

export interface DepartmentInfo
{
    name: string;
    apiKey: string;
}

export interface DepartmentContactPerson
{
    name: string;
    email: string;
    telephone: string;
}

const DepartmentSchema = new Schema(
    {
        departmentId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        departmentInfo: {
            type: Object,
            default: {
                name: { required: true, default: '' },
                apiKey: { required: true, default: '' }
            }
        },
        departmentContactPerson: {
            type: Object,
            default: {
                name: { required: true, default: '' },
                email: { required: true, default: '' },
                telephone: { required: true, default: '' }
            }
        }
    },
    { timestamps: true }
);

const Department = model<DepartmentDocument>("Department", DepartmentSchema);

export default Department;
