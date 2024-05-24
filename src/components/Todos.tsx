/*
    ? interface es facil de extender y se pueden poner varios tipos de datos
    * Mientras que type no, ya que, solo se puede poner un solo tipo de dato
    type Todo = {
        id: string,
        title: string,
        completed: boolean,
    }
    
    interface Todo {
        id: string,
        title: string,
        completed: boolean,
    }
    
    type ListOfTodos = Array<Todo> ? Se puede hacer tambien de esta manera
    type ListOfTodos = Todo[]
    
    ? Ahora, el interfaca Todo, y el type ListOfTodos los vamos a reutilizar
    ? Por ende, creamos un archivo d.ts para exportarlo y reutilizarlos

    * Cuando sale el error:
    ? La propiedad 'todos' no existe en el tipo '{}'.
    * Al utilizar React.FC, significa que debemos pasarle unos props
    * Ya que, esta recibiendo el array que es "todos", y al recibirlos
    * Va a tomar los props de cualquier forma
    * Para esto, se puede hacer de la siguiente manera
*/
import { useState } from 'react';
import { ListOfTodos, Todo as TodoType, todoId, todoTitle } from '../types';
import { Todo } from './Todo';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
    todos: ListOfTodos
    handleRemove: ({ id }: todoId) => void
    handleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    setTitle: (id: todoId, title: todoTitle) => void
}

export const Todos: React.FC<Props> = ({ todos, handleRemove, handleCompleted, setTitle }) => {
    const [todoEdit, setTodoEdit] = useState('');
    const [parent] = useAutoAnimate();
    return (
        <ul ref={parent} className='todo-list'>
            <span className='todoSuggest'>Debes dar doble click en la tarea para modificarla</span>
            {todos?.map(todo => (
                <li
                    key={todo.id}
                    onDoubleClick={() => setTodoEdit(todo.id)}
                    className={`${todo.completed ? 'completed' : ''} ${todoEdit === todo.id ? 'editing' : ''}`}
                >
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        handleRemove={handleRemove}
                        handleCompleted={handleCompleted}
                        todoEdit={todoEdit}
                        setTodoEdit={setTodoEdit}
                        setTitle={setTitle}
                    />
                </li>
            ))}
        </ul>
    )
}