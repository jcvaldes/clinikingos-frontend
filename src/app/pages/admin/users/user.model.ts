import { Role } from '../roles/role.model';
export class User {
  constructor(
    public fullname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public confirmpassword?: string,
    public roles?: Role[],
    public img?: string,
    public google?: string,
    public id?: string
  ) {}
}
