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
import { ListOfTodos, Todo as TodoType, todoId } from '../types';
import { Todo } from './Todo';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
    todos: ListOfTodos
    handleRemove: ({ id }: todoId) => void
    handleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todos: React.FC<Props> = ({ todos, handleRemove, handleCompleted }) => {
    const [parent] = useAutoAnimate();
    return (
        <ul ref={parent} className='todo-list'>
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`${todo.completed ? 'completed' : ''}`}
                >
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        handleRemove={handleRemove}
                        handleCompleted={handleCompleted}
                    />
                </li>
            ))}
        </ul>
    )
}