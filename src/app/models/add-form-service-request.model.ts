export class FormService {
  constructor(
    public profileId?: number,
    public dealId?: number,
    public services?: Service[]
  ) {}
}

export class Service {
  constructor(
    public category?: string,
    public name?: string,
    public price?: number,
    public description?: string
  ) {}
}
