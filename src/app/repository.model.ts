export interface Repository {
    name: string;
    description: string;
    created_at: string;
    clone_url: string;
    language: string;
    size: number;
    html_url: string;
    forks_count: number;
  }

export interface User {
  avatar_url: string,
  bio: string,
  blog: string,
  company: string,
  created_at: string,
  email: string,
  followers: number,
  following: number,
  html_url: string,
  login: string,
  name: string,
}