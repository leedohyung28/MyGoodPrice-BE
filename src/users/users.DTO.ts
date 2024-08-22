import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDataDTO {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
