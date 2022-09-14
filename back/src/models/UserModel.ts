export default interface UserModel {
    id: number
    account: string
    password?: string
}

const user1 = { id: 1, account: "admin", password: "hogehoge" } as UserModel
const user2 = { id: 2, account: "guest", password: "piyopiyo" } as UserModel

export const testUserList = [user1, user2]
