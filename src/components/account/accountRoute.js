import express from 'express'
import { login, signup } from './accountController';
const accountRoute = express.Router();

accountRoute.post('/login', login)
accountRoute.post('/', signup)

export default accountRoute;