import { APIStatus } from '../../lib/common';
import * as AccountService from './accountService';


export const login = async (req, res, next) => {
    try {
        const {username, password} = req;
        const res = await AccountService.login({username, password});
        
        if(res.data){
            const token = await res.data.generateAuthToken()
            return res.status(200).json({
                status: APIStatus.OK,
                data:[{
                    account: res.data,
                    token: token,
                }],
                message: "LOGIN SUCCESS",
            })
        } else{
            return res.status(401).send({
                status: APIStatus.AUTHENTICATE,
                message: response.message
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: APIStatus.INTERNAL_ERROR,
            message: error.message
        })
    }
}

export const signup = async (req, res, next) => {
    try {
        const account = await AccountService.createAccount(req.body);
        const token = await account.generateAuthToken()
        res.status(201).send({
            status: APIStatus.OK,
            data:[{
                account,
                token,
            }],
            message: "Create account successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: APIStatus.INTERNAL_ERROR,
            message: error.message
        })
    }
}