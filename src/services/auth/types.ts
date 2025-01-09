export interface ILoginBody {
  email: string;
  password: string;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}
