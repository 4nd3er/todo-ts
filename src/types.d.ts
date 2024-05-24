import { TODO_FILTERS } from "./consts"

export interface Todo {
    id: string,
    title: string,
    completed: boolean,
}

export type todoId = Pick<Todo, 'id'>
export type todoTitle = Pick<Todo, 'title'>
export type todoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
// ? De esta manera el filterSelected espera cualquier que este dentro del TODO_FILTERS