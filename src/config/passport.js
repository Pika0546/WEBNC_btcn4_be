import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import Account from '../model/account'
import { JWT_KEY } from '.';

const validateAccount = async (jwt_payload, done) => {
    try {
        const account = await Account.findOne({ id: jwt_payload.id });
        if(account){
            done(null, account);
        }
        else{
            done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}
     
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = JWT_KEY;

passport.use(new Strategy(opts, validateAccount));

export default passport;