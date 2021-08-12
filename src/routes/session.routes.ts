import { Router } from "express";

import { SessionLoginController } from "../controllers/SessionLoginController";

const sessionRouter = Router();

const sessionLoginController = new SessionLoginController();

sessionRouter.post('/login', sessionLoginController.handle);

export { sessionRouter };
