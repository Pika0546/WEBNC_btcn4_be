import express from 'express'
import { getAccountList, login, signup } from './accountController';
const accountRoute = express.Router();

accountRoute.post('/login', login)
accountRoute.post('/', signup)
accountRoute.get('/', getAccountList)
export default accountRoute;