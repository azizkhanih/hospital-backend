import
{
    DocumentDefinition,
    FilterQuery, QueryOptions, UpdateQuery
} from "mongoose";
import Department, { DepartmentDocument } from "../model/department.model";

export function getDepartments()
{
    return Department.find();
}

export function createDepartment(input: DocumentDefinition<DepartmentDocument>)
{
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
