export class FormProduct {
  constructor(
    public profileName?: string,
    public profileId?: number,
    public dealId?: number,
    public products?: Product[]
  ) {}
}

export class Product {
  constructor(
    public category?: string,
    public name?: string,
    public price?: string,
    public description?: string,
    public link?: string,
    public image?: string
  ) {}
}

export class ProductResponse {
  constructor(
    public category?: string,
    public name?: string,
    public price?: string,
    public description?: string,
    public link?: string,
    public imageName?: string
  ) {}
}
