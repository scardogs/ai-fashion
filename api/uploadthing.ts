import { createRouteHandler } from "uploadthing/express";
import { ourFileRouter } from "../server/routes/uploadthing";
import express from "express";

const app = express();
const handler = createRouteHandler({
    router: ourFileRouter,
    config: {
        token: process.env.UPLOADTHING_TOKEN,
    },
});

// Mount handler
app.use("/", handler);

export default app;
