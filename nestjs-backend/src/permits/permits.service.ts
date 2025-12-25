import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermitDto } from "./dto/create-permit.dto";
import { UpdatePermitDto } from "./dto/update-permit.dto";
import { PaginationDto } from "./dto/pagination.dto";
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

    async findAll(paginationDto: PaginationDto) {
        const { page = 1, limit = 10, search, status, dateFrom, dateTo } = paginationDto;
        const skip = (page - 1) * limit;

        const where: Prisma.PermitApplicationWhereInput = {};

        if (search) {
            where.OR = [
                { applicant_name: { contains: search, mode: 'insensitive' } },
                { applicant_email: { contains: search, mode: 'insensitive' } },
                { permit_type: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (status) {
            where.application_status = status;
        }

        if (dateFrom || dateTo) {
            where.submitted_at = {};
            if (dateFrom) {
                where.submitted_at.gte = new Date(dateFrom);
            }
            if (dateTo) {
                const endDate = new Date(dateTo);
                endDate.setHours(23, 59, 59, 999);
                where.submitted_at.lte = endDate;
            }
        }

        const [data, total] = await Promise.all([
            this.prisma.permitApplication.findMany({
                where,
                skip,
                take: limit,
                orderBy: { submitted_at: "desc" },
            }),
            this.prisma.permitApplication.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
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
