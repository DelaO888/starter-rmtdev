export type JobItem = {
  id: number;
  relevanceScore: number;
  daysAgo: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  salary: string;
  duration: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
