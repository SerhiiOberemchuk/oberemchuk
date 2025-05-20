export interface Project {
  id?: number;
  slug: string;
  title: string;
  category: string;
  image_src: string;
  description: string;
  technologies: string[];
  features: string[];
  year: string;
  client: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}
