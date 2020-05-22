export class Subscription {
  constructor(
    public id: string,
    public txid: string,
    public origen: string,
    public currency: string,
    public amount: string,
    public status: string,
    public statusDetail: string,
    public plan: string,
    public endsAt: string,
    public active: boolean,
    public createdAt: string
  ) { }
}
