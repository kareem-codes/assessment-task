import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePermitDto {
    @IsNotEmpty()
    applicant_name: string;

    @IsEmail()
    applicant_email: string;

    @IsNotEmpty()
    permit_type: string;
}
