export interface TokenResponse {
  token: string;
  expires: string;
  role: 'manager' | 'employee';
}
