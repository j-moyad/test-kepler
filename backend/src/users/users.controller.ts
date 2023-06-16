import {Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
        let user = await this.userService.create(createUserDto);
        user.password = undefined;

        // TODO: Hashear contraseña antes de persistir en DB
        // TODO: Envío de notificación por email

        return user;
    }

    @Get('/:id')
    @UsePipes(ValidationPipe)
    getUser(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
