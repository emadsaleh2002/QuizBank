export interface User {
  id: string;
  email: string;
  password?: string; // for registration and login purposes
  role: 'admin' | 'student';
}