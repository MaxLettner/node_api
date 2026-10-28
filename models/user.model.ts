import type { RowDataPacket } from "mysql2";
import type IRole from "./role.model.ts";

export default interface IUser {
    id?: string,
    name: string,
    roleId: number,
    role?: IRole,
};