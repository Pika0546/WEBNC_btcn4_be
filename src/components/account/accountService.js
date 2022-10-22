import Account from "./accountModel"

export const login = async ({
    username,
    password,
}) => {
    return Account.findByCredentials(username, password);
}

export const findAccount = async (data) => {
    if(data){
        const {username, accountID} = data;
        return await Account.findOne({
            username: username,
        })
    }
    return null
}

export const createAccount = async (data) => {
    const newAccount = new Account(data)
    return newAccount.save();
}

export const getAccoutList = async ({
    offset,
    limit,
}) => {
    const o = offset || 0;
    const l = limit || 1000;
    return await Account.find({}).skip(o).limit(l);
}