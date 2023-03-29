import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleError } from "./errors";
import userRouters from "./routes/user.routes";
import contactRouters from "./routes/contact.routes";
import cors from "cors";
// import categoryRoute from "./routers/category.routes";
// import propertyRouter from "./routers/properties.routes";
// import scheduleRouter from "./routers/schedule.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouters);
app.use("/contact", contactRouters);
// app.use("/login", loginRoutes);
// app.use("/categories", categoryRoute);
// app.use("/properties", propertyRouter);
// app.use("/schedules", scheduleRouter);

app.use(handleError);
export default app;
