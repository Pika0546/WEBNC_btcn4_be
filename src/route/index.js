import accountRoute from "../components/account/accountRoute"
import { APIStatus } from "../lib/common"

export const router = (app) => {
    app.use('/account', accountRoute);
    app.use('/', async (req, res, next) => {
        try {
            res.status(200).json({
                status: APIStatus.OK,
                message: "Helloooooooooooooo",
                data: []
            })
            /*============= call API in FE ============
                const res = await (await fetch("http://localhost:3030/")).json();
                console.log(res); 
            */
        } catch (error) {
            res.status(500).json({
                status: APIStatus.INTERNAL_ERROR,
                message: error.message
            })
        }
    })
    
}