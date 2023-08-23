export class ResendOnboardingRequest {
  constructor(
    public profileId?: number,
    public dealId?: number,
    public clientemail?: string
  ) {}
}
