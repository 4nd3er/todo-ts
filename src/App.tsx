// import { useState } from 'react';
// import { Todos } from './components/Todos';
// import { FilterValue, ListOfTodos, Todo as TodoType, todoId, todoTitle } from './types';
// import { TODO_FILTERS } from './consts';
// import { Footer } from './components/Footer';
// import { Header } from './components/Header';
// import Swal from 'sweetalert2';
// import './css/style.css';

// // ? Tambien se puede hacer de esta manera
// // * Tipea toda la funcion, y no solo lo que retorna
// // const App: React.FC = () => {
// //     return (
// //         <h1>hola</h1>
// //     )
// // }

// // ? Elemento de JAVASCRIPT REACT
// // * Especificamos que devuelve un elemento de React
// const App = (): JSX.Element => {
//     const todosURL = (): void => {
//         const urlSearch = location.search;
//         if (!urlSearch) {
//             return;
//         }
//         const params = new URLSearchParams(urlSearch);

//         const urlTODOS = params.get('data') ?? '';
//         const urlDecode = atob(urlTODOS);
//         const todosDecode = JSON.stringify(urlDecode);
//         const todosDecode2 = JSON.parse(todosDecode);
//         localStorage.setItem('todos', todosDecode2);
//     }

//     todosURL();

//     const jsonURL = (newTodos: ListOfTodos): void => {
//         const jsonStr = JSON.stringify(newTodos);
//         const jsonCode = btoa(jsonStr);
//         history.replaceState('data', 'null', `?data=${jsonCode}`);
//     }

//     const todosSaved = localStorage.getItem('todos');
//     const mockTodos: ListOfTodos = todosSaved ? JSON.parse(todosSaved) : [];
//     const [todos, setTodos] = useState(mockTodos);

//     const setItemStorage = (newTodos: ListOfTodos): void => {
//         localStorage.setItem('todos', JSON.stringify(newTodos));
//     }

//     const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
//     /*
//         En este caso si o si necesitamos
//         pasarle un array con objects estructurados como estan en type.d.ts
//         Si no lo hacemos generara un error
//     */
//     const handleRemove = ({ id }: todoId): void => {
//         const newTodos = todos.filter(todo => todo.id !== id);
//         setTodos(newTodos);
//         jsonURL(newTodos);
//         setItemStorage(newTodos);
//     }

//     const handleClick = (): void => {
//         const text = `${location.href}`;
//         navigator.clipboard.writeText(text);
//         Swal.mixin({
//             toast: true,
//             position: 'top-end',
//             timer: 2000,
//             timerProgressBar: true
//         }).fire({
//             icon: 'success',
//             title: 'Url copiada en el portapapeles!',
//             showConfirmButton: false
//         })
//     }

//     const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
//         const newTodos = todos.map(todo => {
//             if (todo.id === id) {
//                 return {
//                     ...todo,
//                     completed
//                 }
//             }
//             return todo;
//         })
//         setTodos(newTodos);
//         jsonURL(newTodos);
//         setItemStorage(newTodos);
//     }

//     const handleFilterChange = (filter: FilterValue): void => {
//         setFilterSelected(filter);
//     }

//     const filterTodos = todos.filter(todo => {
//         if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
//         if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
//         return todo;
//     })

//     const onClearCompleted = () => {
//         const newTodos = todos.filter(todo => !todo.completed);
//         setTodos(newTodos);
//         jsonURL(newTodos);
//         setItemStorage(newTodos);
//     }

//     const handleAddTodo = ({ title }: todoTitle): void => {
//         if (!title.trim()) {
//             Swal.mixin({
//                 toast: true,
//                 position: 'top-start',
//                 timer: 2000,
//                 timerProgressBar: true
//             }).fire({
//                 icon: 'warning',
//                 title: 'Debes digitar la tarea para añadirla a la lista',
//                 showConfirmButton: false,
//             })
//             return;
//         }
//         const newTodo = {
//             id: crypto.randomUUID(),
//             title: title.trim(),
//             completed: false
//         }
//         const newTodos = [...todos, newTodo];
//         setTodos(newTodos);
//         jsonURL(newTodos);
//         setItemStorage(newTodos);
//     }


//     const activeCount = todos.filter(todo => !todo.completed).length;
//     const completedCount = todos.length - activeCount;

//     return (
//         <div className='todoapp'>
//             <Header
//                 onAddTodo={handleAddTodo}
//             />
//             <Todos
//                 todos={filterTodos}
//                 handleRemove={handleRemove}
//                 handleCompleted={handleCompleted}
//             />
//             <Footer
//                 activeCount={activeCount}
//                 completedCount={completedCount}
//                 filterSelected={filterSelected}
//                 onClearCompleted={onClearCompleted}
//                 handleFilterChange={handleFilterChange}
//             />
//             {todos.length > 0 && (
//                 <section className='btnSection'>
//                     <a
//                         className='btnURL'
//                         onClick={handleClick}
//                     >Copiar lista de tareas</a>
//                 </section>
//             )
//             }
//         </div>
//     )
// }
// export default App

import { Todos } from './components/Todos.tsx';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { TodoProvider, useTodos } from './context/TodoContext.tsx';
import { TODO_FILTERS } from './consts';
import './css/style.css';

const App = (): JSX.Element => {
    const {
        todos,
        filterSelected,
        handleRemove,
        handleClick,
        handleCompleted,
        handleFilterChange,
        onClearCompleted,
        handleAddTodo,
        activeCount,
        completedCount
    } = useTodos();

    const filterTodos = todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
        if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
        return todo;
    });

    return (
        <div className='todoapp'>
            <Header onAddTodo={handleAddTodo} />
            <Todos
                todos={filterTodos}
                handleRemove={handleRemove}
                handleCompleted={handleCompleted}
            />
            <Footer
                activeCount={activeCount}
                completedCount={completedCount}
                filterSelected={filterSelected}
                onClearCompleted={onClearCompleted}
                handleFilterChange={handleFilterChange}
            />
            {todos.length > 0 && (
                <section className='btnSection'>
                    <a className='btnURL' onClick={handleClick}>
                        Copiar lista de tareas
                    </a>
                </section>
            )}
        </div>
    );
};

const AppWrapper = (): JSX.Element => (
    <TodoProvider>
        <App />
    </TodoProvider>
);

export default AppWrapper;
