import config from "config";
import cors from "cors";
import { Express, Request, Response } from "express";
import { createDepartmentHandler, deleteDepartmentHandler, getDepartmentHandler, getDepartmentsHandler, updateDepartmentHandler } from "./controller/department.controller";
import
{
    createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest } from "./middleware";
import
{
    createDepartmentSchema, deleteDepartmentSchema, updateDepartmentSchema
} from "./schema/department.schema";
import
{
    createUserSchema,
    createUserSessionSchema
} from "./schema/user.schema";

var corsOptions = {
    origin: config.get("allowedOrigin") as string,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export default function (app: Express)
{
    app.use(cors(corsOptions));

    app.get("/healthcheck", cors(corsOptions), (req: Request, res: Response) => res.sendStatus(200));

    // Register user
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

    // Login
    app.post(
        "/api/sessions",
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
    );

    // Get the user's sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

    // Logout
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

    // Get a departments
    app.get("/api/departments", requiresUser, getDepartmentsHandler);

    // Create a department
    app.post(
        "/api/departments",
        [requiresUser, validateRequest(createDepartmentSchema)],
        createDepartmentHandler
    );

    // Update a department
    app.put(
        "/api/departments/:departmentId",
        [requiresUser, validateRequest(updateDepartmentSchema)],
        updateDepartmentHandler
    );

    // Get a department
    app.get("/api/departments/:departmentId", requiresUser, getDepartmentHandler);

    // Delete a department
    app.delete(
        "/api/departments/:departmentId",
        [requiresUser, validateRequest(deleteDepartmentSchema)],
        deleteDepartmentHandler
    );
}
