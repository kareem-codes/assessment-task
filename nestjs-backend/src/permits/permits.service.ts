import { Injectable } from '@nestjs/common';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermitsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePermitDto) {
    return this.prisma.permitApplication.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.permitApplication.findMany({
      orderBy: { submitted_at: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.permitApplication.findUnique({ where: { id: id } });
  }

  update(id: number, updatePermitDto: UpdatePermitDto) {
    return this.prisma.permitApplication.update({
      where: { id: id },
      data: updatePermitDto,
    });
  }

  remove(id: number) {
    return this.prisma.permitApplication.delete({ where: { id: id } });
  }
}
