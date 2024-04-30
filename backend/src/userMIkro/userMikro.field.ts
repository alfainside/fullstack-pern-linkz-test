import { IsString } from 'class-validator';

export class registerUserNew {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class userLogin {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  username!: string;
  name!: string;
  password?: string;
}

export class RegisterOauth {
  username: string;
  name: string;
  password: string;
}
