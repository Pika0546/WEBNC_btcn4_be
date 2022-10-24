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
            return res.status(401).json({
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
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({
                status: APIStatus.INVALID_INPUT,
                message: "username or password is missing"
            })
        }
        const old = await AccountService.findAccount({username: username});
        if(old){
            return res.status(400).json({
                status: APIStatus.EXISTED,
                message: "Username existed"
            })
        }
        const account = await AccountService.createAccount(req.body);
        const token = await account.generateAuthToken()
        res.status(200).json({
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


export const getAccountList = async (req, res, next) => {
    try {
        const data = await AccountService.getAccoutList({});
        res.status(200).json({
            status: APIStatus.OK,
            data:[...data],
            message: "Query account successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: APIStatus.INTERNAL_ERROR,
            message: error.message
        })
    }
}