import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT, JWT_KEY } from "../config";

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    gender: Boolean,
    dob: Date,
    type: String, //parent or child?
    phone: {
        type: String,
        minLength: 7
    },
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'AccountSchema'}] //self-reference: cha mẹ có thể có nhìu con cái
})

//hash pwd
AccountSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, BCRYPT_SALT)
    }
    next()
})

AccountSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

AccountSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by username and password.
    const account = await Account.findOne({ username} )
    if (!account) {
        return {
            data: null,
            message: "Tài khoản không tồn tại"
        }
    }
    const isPasswordMatch = await bcrypt.compare(password, account.password)
    if (!isPasswordMatch) {
        return {
            data: null,
            message: "Mật khẩu không chính xác"
        }
    }
    return {
        data: account,
    }
}

const Account = mongoose.model('Account', AccountSchema);

export default Account;