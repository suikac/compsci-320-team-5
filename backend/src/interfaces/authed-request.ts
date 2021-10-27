import { UserData } from '.';

export interface AuthorizedRequest extends Request {
  user: UserData;
}
