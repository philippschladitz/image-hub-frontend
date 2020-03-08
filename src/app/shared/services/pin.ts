export interface Pin {
  id: string;
  title: string;
  topic: string;
  description: string;
  link: string;
  image: string;
  comments: Array<{
    comment: string;
    userId: string;
  }>;
}
