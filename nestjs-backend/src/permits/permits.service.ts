import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermitDto } from "./dto/create-permit.dto";
import { UpdatePermitDto } from "./dto/update-permit.dto";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class PermitsService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreatePermitDto) {
        const permit = await this.prisma.permitApplication.findFirst({
            where: { applicant_email: dto.applicant_email },
        });
        if (permit) {
            throw new HttpException(`Permit for email ${dto.applicant_email} already exists`, 400);
        }
        return this.prisma.permitApplication.create({
            data: dto,
        });
    }

    async findAll() {
        return this.prisma.permitApplication.findMany({
            orderBy: { submitted_at: "desc" },
        });
    }

    async findOne(id: number) {
        const permit = await this.prisma.permitApplication.findUnique({
            where: { id },
        });
        if (!permit) {
            throw new NotFoundException(`Permit with ID ${id} not found`);
        }

        return permit;
    }

    async update(id: number, updatePermitDto: UpdatePermitDto) {
        try {
            return await this.prisma.permitApplication.update({
                where: { id },
                data: updatePermitDto,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new NotFoundException(`Permit with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number) {
        try {
            await this.prisma.permitApplication.delete({ where: { id } });
			return { message: `Permit with ID ${id} has been deleted` };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new NotFoundException(`Permit with ID ${id} not found`);
            }
            throw error;
        }
    }
}
