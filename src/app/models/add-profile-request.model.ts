export class AddProfileRequestModel {
  constructor(
    public ClientId: number,
    public Name: string,
    public Description?: string
  ) {}
}
