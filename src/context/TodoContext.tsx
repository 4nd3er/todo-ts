import { createContext, useContext, useState, ReactNode } from 'react';
import { ListOfTodos, FilterValue, Todo as TodoType, todoId, todoTitle} from '../types.js';
import { TODO_FILTERS } from '../consts.js';
import Swal from 'sweetalert2';

interface TodoContextProps {
    todos: ListOfTodos;
    filterSelected: FilterValue;
    handleRemove: ({ id }: todoId) => void;
    handleClick: () => void;
    handleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void;
    handleFilterChange: (filter: FilterValue) => void;
    onClearCompleted: () => void;
    handleAddTodo: ({ title }: todoTitle) => void;
    activeCount: number;
    completedCount: number;
    setTitle: (id: todoId, title: todoTitle) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodoProvider');
    }
    return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const todosURL = (): void => {
        const urlSearch = location.search;
        if (!urlSearch) {
            return;
        }
        const params = new URLSearchParams(urlSearch);

        const urlTODOS = params.get('data') ?? '';
        const urlDecode = atob(urlTODOS);
        const todosDecode = JSON.stringify(urlDecode);
        const todosDecode2 = JSON.parse(todosDecode);
        localStorage.setItem('todos', todosDecode2);
    };

    todosURL();

    const jsonURL = (newTodos: ListOfTodos): void => {
        const jsonStr = JSON.stringify(newTodos);
        const jsonCode = btoa(jsonStr);
        history.replaceState('data', 'null', `?data=${jsonCode}`);
    };

    const todosSaved = localStorage.getItem('todos');
    const mockTodos: ListOfTodos = todosSaved ? JSON.parse(todosSaved) : [];
    const [todos, setTodos] = useState(mockTodos);

    const setItemStorage = (newTodos: ListOfTodos): void => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);

    const handleRemove = ({ id }: todoId): void => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        jsonURL(newTodos);
        setItemStorage(newTodos);
    };

    const handleClick = (): void => {
        const text = `${location.href}`;
        navigator.clipboard.writeText(text);
        Swal.mixin({
            toast: true,
            position: 'top-start',
            timer: 2000,
            timerProgressBar: true
        }).fire({
            icon: 'success',
            title: 'Url copiada en el portapapeles!',
            showConfirmButton: false
        });
    };

    const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed
                };
            }
            return todo;
        });
        setTodos(newTodos);
        jsonURL(newTodos);
        setItemStorage(newTodos);
    };

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter);
    };

    const onClearCompleted = () => {
        const newTodos = todos.filter(todo => !todo.completed);
        setTodos(newTodos);
        jsonURL(newTodos);
        setItemStorage(newTodos);
    };

    const handleAddTodo = ({ title }: todoTitle): void => {
        if (!title.trim()) {
            Swal.mixin({
                toast: true,
                position: 'top-start',
                timer: 2000,
                timerProgressBar: true
            }).fire({
                icon: 'warning',
                title: 'Debes digitar la tarea para añadirla a la lista',
                showConfirmButton: false,
            });
            return;
        }
        const newTodo = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false
        };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        jsonURL(newTodos);
        setItemStorage(newTodos);
    };

    const setTitle = ({ id }: todoId, { title }: todoTitle) => {
        const setTodo = todos.filter(todo => todo.id === id);
        setTodo[0].title = title;
        todos.forEach((todo): void => {
            if (todo.id === id) {
                todo = setTodo[0];
                return;
            }
        })
        setTodos(todos);
        jsonURL(todos);
        setItemStorage(todos);
    }

    const activeCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.length - activeCount;

    return (
        <TodoContext.Provider value={{
            todos,
            filterSelected,
            handleRemove,
            handleClick,
            handleCompleted,
            handleFilterChange,
            onClearCompleted,
            handleAddTodo,
            activeCount,
            completedCount,
            setTitle
        }}>
            {children}
        </TodoContext.Provider>
    );
};
