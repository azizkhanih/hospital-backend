import { Express, Request, Response } from "express";
import { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest } from "./middleware";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";

export default function (app: Express)
{
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

}