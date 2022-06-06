import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateTodoDto from 'src/dtos/createTodo.dto';
import UpdateTodoDto from 'src/dtos/updateTodo.dto';
import Todo from 'src/entities/todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}
  //get all
  getAllTodos() {
    return this.todoRepo.find();
  }
  //find by id
  async getById(id) {
    const todo = await this.todoRepo.findOne(id);
    if (todo) {
      return todo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }
  //create a new
  async createTodo(todo: CreateTodoDto) {
    const newTodo = this.todoRepo.create(todo);
    await this.todoRepo.save(newTodo);
    return newTodo;
  }
  // update
  async updateTodo(id, post: UpdateTodoDto) {
    await this.todoRepo.update(id, post);
    const updatedTodo = await this.todoRepo.findOne(id);
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteTodo(id: number) {
    const deletedTodo = await this.todoRepo.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
