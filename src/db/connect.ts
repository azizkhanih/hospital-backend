import config from "config";
import mongoose from "mongoose";
import log from "../logger";

function connect()
{
    const dbUri = config.get("dbUri") as string;

    return mongoose
        .connect(dbUri, {})
        .then(() =>
        {
            log.info("Hospital database connected");
        })
        .catch((error) =>
        {
            log.error("Database error", error);
            process.exit(1);
        });
}

export default connect;