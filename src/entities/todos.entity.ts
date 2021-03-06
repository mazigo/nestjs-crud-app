import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
class Todo {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public title: string;
  @Column()
  public description: string;
  @Column()
  public status: boolean;
}
export default Todo;
