export class AddProfileRequestModel {
  constructor(
    public ClientId: number,
    public Name: string,
    public googleProfileId: string,
    public Description: string = ''
  ) {}
}
