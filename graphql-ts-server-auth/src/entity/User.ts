import { Entity, PrimaryColumn, Column, BeforeInsert, BaseEntity } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

//extends baseEntity to allow some methods
@Entity("users")
export class User extends BaseEntity{
    //uuid is the random 16 letters string 
    @PrimaryColumn("uuid") id: string

    @Column("varchar", {length: 255})
    email: string

    @Column("text")
    password: string

    @BeforeInsert()
    addId(){
        this.id = uuidv4()
    }
}
