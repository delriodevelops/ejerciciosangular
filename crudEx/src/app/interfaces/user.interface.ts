export interface User {
  username: string;
  email: string;
  suscrito: boolean;
  pais: string;
  ciudad: string;
  password?: string;
  id?: number | null;
}
