import express from 'express';
import { TYPES } from '../config/types';
import { iocContainer as Container } from '../config/container';
import { ILoggerService } from '../interfaces/ILoggerService';
import { IUserService } from '../interfaces/IUserService';
import UserController from '../controllers/UserController';
import createUserValidator from '../validators/create-user.validator';

const router = express.Router();

// Get service instance and create a new User controller
const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
const userService = Container.get<IUserService>(TYPES.UserService);
const userController = new UserController(loggerService, userService);

// ToDo: validation
router.get('/verifyUserName', (req, res) =>
  userController.doesUserNameExist(req, res),
);

router.post(
  '/',
  createUserValidator,
  (req: express.Request, res: express.Response) =>
    userController.createUser(req, res),
);

export default router;
