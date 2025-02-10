import { Router } from "express";
import userRouter from "./userRoutes";
import docsRouter from "./docs";
import departmentRouter from "./departmentRoutes";

const appRouter = Router();

const appRoutes = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/docs",
    router: docsRouter,
  },
  {
    path: "/departments",
    router: departmentRouter,
  },
  // add other routes hapa chini
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
