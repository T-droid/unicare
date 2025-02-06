import { Router } from "express";
import userRouter from "./userRoutes";

const appRouter = Router();

const appRoutes = [
  {
    path: "/users",
    router: userRouter,
  },
// add other routes hapa chini 
  
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
