import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'CLIENTES'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: false,
        default: true
    })
    isActive: boolean;
}
