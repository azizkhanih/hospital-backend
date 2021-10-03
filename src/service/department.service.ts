import
{
    DocumentDefinition,
    FilterQuery, QueryOptions, UpdateQuery
} from "mongoose";
import { nanoid } from "nanoid";
import Department, { DepartmentDocument } from "../model/department.model";

export function getDepartments(query: FilterQuery<DepartmentDocument>)
{
    return Department.find(query);
}

export function createDepartment(input: DocumentDefinition<DepartmentDocument>)
{
    input.departmentId = nanoid(10);
    return Department.create(input);
}

export function findDepartment(
    query: FilterQuery<DepartmentDocument>,
    options: QueryOptions = { lean: true }
)
{
    return Department.findOne(query, {}, options);
}

export function findAndUpdate(
    query: FilterQuery<DepartmentDocument>,
    update: UpdateQuery<DepartmentDocument>,
    options: QueryOptions
)
{
    return Department.findOneAndUpdate(query, update, options);
}

export function deleteDepartment(query: FilterQuery<DepartmentDocument>)
{
    return Department.deleteOne(query);
}
