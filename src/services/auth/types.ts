import { Token } from "@/enums/token";

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ITokenResponse {
  [Token.ACCESS]: string;
  [Token.REFRESH]: string;
}
