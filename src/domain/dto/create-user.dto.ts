import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  readonly name?: string;

  @IsPhoneNumber('MM')
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
