import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { DefaultType } from './defaultModel'
import { Exclude } from "class-transformer";

@Entity({ name: "records" })
export class Records extends DefaultType {
    @PrimaryGeneratedColumn('uuid')
    @Exclude()
    readonly id?: string

    @Column({ nullable: false })
    x: number

    @Column({ nullable: false })
    y: number

    @Column({ nullable: false })
    width: number

    @Column({ nullable: false })
    height: number

}