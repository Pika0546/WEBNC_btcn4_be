import Account from "./accountModel"

export const login = async ({
    username,
    password,
}) => {
    return Account.findByCredentials(username, password);
}

export const createAccount = async (data) => {
    const newAccount = new Account(data)
    return newAccount.save();
}