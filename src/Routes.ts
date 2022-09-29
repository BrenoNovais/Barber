import { Router } from "express";
import CheckSubscriptionController from "./controllers/haircut/CheckSubscriptionController";
import CountHaircutController from "./controllers/haircut/CountHaircutController";
import CreateHaircutController from "./controllers/haircut/CreateHaircuteController";
import DetailHaircutController from "./controllers/haircut/DetailHaircutController";
import ListHaircutController from "./controllers/haircut/ListHaircutController";
import UpdateHaircutController from "./controllers/haircut/UpdateHaircutController";
import FinishScheduleController from "./controllers/schedule/FinishScheduleController";
import ListScheduleController from "./controllers/schedule/ListScheduleController";
import NewScheduleController from "./controllers/schedule/NewScheduleController";
import AuthUserController from "./controllers/user/AuthUserController";
import CreateUserController from "./controllers/user/CreateUserController";
import DetailUserController from "./controllers/user/DetailUserController";
import UpdateUserController from "./controllers/user/UpdateUserController";
import isAuthenticated from "./middlewares/isAuthenticated";

const Routes = Router()

Routes.post("/user", new CreateUserController().handle)
Routes.post("/session", new AuthUserController().handle)
Routes.get("/me", isAuthenticated, new DetailUserController().handle)
Routes.put("/users", isAuthenticated, new UpdateUserController().handle)


Routes.post("/haircut", isAuthenticated, new CreateHaircutController().handle)
Routes.get("/haircuts", isAuthenticated, new ListHaircutController().handle)
Routes.put("/haircut", isAuthenticated, new UpdateHaircutController().handle)
Routes.get("/haircut/check", isAuthenticated, new CheckSubscriptionController().handle)
Routes.get("/haircut/count", isAuthenticated, new CountHaircutController().handle)
Routes.get("/haircut/detail", isAuthenticated, new DetailHaircutController().handle,)


Routes.post("/schedule", isAuthenticated, new NewScheduleController().handle)
Routes.get("/schedule", isAuthenticated, new ListScheduleController().handle)
Routes.delete("/schedule", isAuthenticated, new FinishScheduleController().handle)




export default Routes