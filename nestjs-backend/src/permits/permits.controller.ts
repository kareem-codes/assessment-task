import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common";
import { PermitsService } from "./permits.service";
import { CreatePermitDto } from "./dto/create-permit.dto";
import { UpdatePermitDto } from "./dto/update-permit.dto";
import { PaginationDto } from "./dto/pagination.dto";

@Controller("permits")
export class PermitsController {
    constructor(private readonly permitsService: PermitsService) {}

    @Post()
    create(@Body() createPermitDto: CreatePermitDto) {
        return this.permitsService.create(createPermitDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.permitsService.findAll(paginationDto.page, paginationDto.limit);
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.permitsService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() updatePermitDto: UpdatePermitDto) {      
        return this.permitsService.update(id, updatePermitDto);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.permitsService.remove(id);
    }
}
