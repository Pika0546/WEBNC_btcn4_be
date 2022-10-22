const getToken = (headers) => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }   
}

export const auth = async (req, res, next) => {
    const token = getToken(req.headers);
    if(!token){
        res.status(403).json({
            status: "AUTHENTICATE",
            message: "Unauthorized"
        })
    }
    else{
        next()
    }
}