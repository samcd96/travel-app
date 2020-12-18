export class ImageRequestBody {
  constructor(
    public image: {
      image: string;
      caption: string;
    }
  ) {}
}
