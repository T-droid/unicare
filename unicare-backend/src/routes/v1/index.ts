import { Router } from "express";
import userRouter from "./userRoutes";
import docsRouter from "./docs";
import departmentRouter from "./departmentRoutes";
import studentRouter from "./studentRoutes";
import pharmacistRouter from "./pharmacistRoutes";
import receptionistRouter from "./receptionistRoutes";
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
  {
    path: "/students",
    router: studentRouter,
  },
  {
    path: "/drug",
    router: pharmacistRouter,
  },
  {
    path: "/receptionist",
    router: receptionistRouter,
  },
  // add other routes hapa chini
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
