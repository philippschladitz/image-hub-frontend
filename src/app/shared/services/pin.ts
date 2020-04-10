export interface Pin {
  id: string;
  title: string;
  topic: string;
  description: string;
  link: string;
  image: string;
  comments: Array<{
    comment: string;
    createdAt: Date;
    userId: string;
    userName: string;
  }>;
  photos: Array<{
    base64: string;
    comment: string;
    userId: string;
    userName: string;
  }>;
}
