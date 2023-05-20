export class FormService {
  constructor(
    public profileName?: string,
    public dealId?: number,
    public profileId?: number,
    public services?: Service[]
  ) {}
}

export class Service {
  constructor(
    public category?: string,
    public name?: string,
    public price?: string,
    public description?: string
  ) {}
}
