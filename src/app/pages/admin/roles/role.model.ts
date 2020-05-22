export class Role {
  constructor(
    public rolename: string,
    public description: string,
    public ApplicationId: number,
    public active: boolean,
    public id?: string,
    public permissionsRole?: any[],
  ) { }
}
