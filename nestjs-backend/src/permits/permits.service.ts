import { Injectable } from '@nestjs/common';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';

@Injectable()
export class PermitsService {
  create(createPermitDto: CreatePermitDto) {
    return 'This action adds a new permit';
  }

  findAll() {
    return `This action returns all permits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permit`;
  }

  update(id: number, updatePermitDto: UpdatePermitDto) {
    return `This action updates a #${id} permit`;
  }

  remove(id: number) {
    return `This action removes a #${id} permit`;
  }
}
