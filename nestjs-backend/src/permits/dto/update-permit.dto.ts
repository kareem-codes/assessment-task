import { PartialType } from "@nestjs/mapped-types";
import { CreatePermitDto } from "./create-permit.dto";
import { ApplicationStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdatePermitDto extends PartialType(CreatePermitDto) {
    @IsEnum(ApplicationStatus)
    application_status?: ApplicationStatus;
}
