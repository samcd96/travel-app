export class Trip {
  constructor(
    public id: string,
    public tripName: string,
    public coverImage: string,
    public tripStart: Date,
    public tripEnd: Date,
    public description: string,
    public createdBy: string,
    public createdAt: Date,
    public images: {
      image: string;
      caption: string;
    }[]
  ) {}
}
