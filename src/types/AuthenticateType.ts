export interface RegisterUserBody {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthenticatedUser {
  username: string;
  id: string;
  isAdmin: boolean;
}
