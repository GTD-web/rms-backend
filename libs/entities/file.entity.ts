import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('files')
export class File {
    @PrimaryGeneratedColumn('uuid')
    fileId: string;

    @Column()
    fileName: string;

    @Column({unique: true})
    filePath: string;    
}
