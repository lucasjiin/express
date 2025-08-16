/**
 * Test.ts
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Test {
  @Column({ type: 'varchar', unique: true })
  email!: string;

  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;
}

export default Test;
