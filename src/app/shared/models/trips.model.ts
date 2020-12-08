export class Trip {
  constructor(
    public id: string,
    public tripName: string,
    public coverImage: string,
    public tripStart: number,
    public tripEnd: number,
    public description: string,
    public createdBy: string,
    public createdAt: Date,
    public images: string[]
  ) {}
}
