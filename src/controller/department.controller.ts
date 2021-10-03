import { Request, Response } from "express";
import { get } from "lodash";
import { createDepartment, deleteDepartment, findAndUpdate, findDepartment, getDepartments } from "../service/department.service";

export async function getDepartmentsHandler(req: Request, res: Response)
{
    const departments = await getDepartments();

    if (!departments)
    {
        return res.sendStatus(404);
    }

    return res.send(departments);
}

export async function createDepartmentHandler(req: Request, res: Response)
{
    const userId = get(req, "user._id");
    const body = req.body;

    const department = await createDepartment({ ...body, user: userId });

    return res.send(department);
}

export async function updateDepartmentHandler(req: Request, res: Response)
{
    const userId = get(req, "user._id");
    const departmentId = get(req, "params.departmentId");
    const update = req.body;

    const department = await findDepartment({ departmentId });

    if (!department)
    {
        return res.sendStatus(404);
    }

    if (String(department.user) !== userId)
    {
        return res.sendStatus(401);
    }

    const updatedDepartment = await findAndUpdate({ departmentId }, update, { new: true });

    return res.send(updatedDepartment);
}

export async function getDepartmentHandler(req: Request, res: Response)
{
    const departmentId = get(req, "params.departmentId");
    const department = await findDepartment({ departmentId });

    if (!department)
    {
        return res.sendStatus(404);
    }

    return res.send(department);
}

export async function deleteDepartmentHandler(req: Request, res: Response)
{
    const userId = get(req, "user._id");
    const departmentId = get(req, "params.departmentId");

    const department = await findDepartment({ departmentId });

    if (!department)
    {
        return res.sendStatus(404);
    }

    if (String(department.user) !== String(userId))
    {
        return res.sendStatus(401);
    }

    await deleteDepartment({ departmentId });

    return res.sendStatus(200);
}
