import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import { createDepartment, deleteDepartment, findAndUpdate, findDepartment, getDepartments } from "../service/department.service";

export async function getDepartmentsHandler(req: Request, res: Response)
{
    const user = get(req, "user");
    const departments = await getDepartments({ user: user._id });

    if (!departments)
    {
        return res.sendStatus(404);
    }

    return res.send(departments);
}

export async function createDepartmentHandler(req: Request, res: Response)
{
    try
    {
        const userId = get(req, "user._id");
        const body = req.body;

        const department = await createDepartment({ ...body, user: userId });

        return res.send(department);
    } catch (e: any)
    {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function updateDepartmentHandler(req: Request, res: Response)
{
    try
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
    } catch (e: any)
    {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getDepartmentHandler(req: Request, res: Response)
{
    try
    {
        const departmentId = get(req, "params.departmentId");
        const department = await findDepartment({ departmentId });

        if (!department)
        {
            return res.sendStatus(404);
        }

        return res.send(department);
    } catch (e: any)
    {
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function deleteDepartmentHandler(req: Request, res: Response)
{
    try
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

        return res.send(true);
    } catch (e: any)
    {
        log.error(e);
        return res.status(409).send(e.message);
    }
}
