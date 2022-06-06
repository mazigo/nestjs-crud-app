import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import CreateTodoDto from 'src/dtos/createTodo.dto';
import UpdateTodoDto from 'src/dtos/updateTodo.dto';
import { TodosService } from 'src/services/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // get all todos
  @Get()
  getTodos() {
    return this.todosService.getAllTodos();
  }

  // get todo by id
  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.todosService.getById(Number(id));
  }

  // create todo
  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return this.todosService.createTodo(todo);
  }

  // update todo
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    return this.todosService.updateTodo(Number(id), todo);
  }

  //delete todo
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    this.todosService.deleteTodo(Number(id));
  }
}
