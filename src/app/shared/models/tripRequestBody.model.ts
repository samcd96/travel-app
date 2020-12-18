export class TripRequestBody {
  constructor(
    public tripName: string,
    public tripStart: number,
    public tripEnd: number,
    public description: string,
    public coverImage?: string
  ) {}
}
