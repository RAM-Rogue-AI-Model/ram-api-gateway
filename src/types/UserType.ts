export interface UpdateUserBody {
  password: string;
  username?: string;
  newPassword?: string;
  confirmPassword?: string;
}
