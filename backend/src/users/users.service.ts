import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './users.dto';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly mailerService: MailerService
    ) {}

    async findOne(id: number): Promise<User | null> {
        let user = null;

        try {
            user = await this.usersRepository.findOneBy({id});

            if (user) {
                this.logger.log(`Se obtiene usuario con id ${id}`);
            } else {
                this.logger.log(`No existe el usuario con id ${id}`);
            }
        } catch (error) {
            this.logger.error(`Error al consultar usuario con id ${id}`, error);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User | null> {
        let user = null;

        try {
            user = await this.usersRepository.create(createUserDto);

            await this.usersRepository.save(user);

            this.logger.log(`Se crea usuario con el id ${user.id}`);

            await this.mailerService.sendMail({
                to: user.email,
                from: 'noreply@test.mail',
                subject: 'Registro de usuario exitoso',
                text: `Buen día ${user.name}, se ha creado tu cuenta con el correo ${user.email}.`,
                html: `<h1>Buen día ${user.name},</h1><p>se ha creado tu cuenta con el correo ${user.email}.</p>`,
            });
        } catch (error) {
            this.logger.error(`Error al crear nuevo usuario`, error);

            await this.mailerService.sendMail({
                to: createUserDto.email,
                from: 'noreply@test.mail',
                subject: 'Registro de usuario fallido',
                text: `Buen día ${createUserDto.name}, no se ha creado tu cuenta con el correo ${createUserDto.email}.`,
                html: `<h1>Buen día ${createUserDto.name},</h1><p>se ha creado tu cuenta con el correo ${createUserDto.email}.</p>`,
            });
        }

        return user;
    }

    async remove(id: number): Promise<void> {
        try {
            if (await this.usersRepository.findOneBy({id})) {
                await this.usersRepository.delete(id);

                this.logger.log(`Se elimina usuario con id ${id}`);
            } else {
                this.logger.log(`No existe usuario con id ${id} para eliminar`);
            }
        } catch (error) {
            this.logger.error(`Error al eliminar usuario con id ${id}`, error);
        }
    }
}
