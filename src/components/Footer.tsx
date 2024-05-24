import { FilterValue, ListOfTodos } from "../types"
import { Filters } from "./Filters"

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: FilterValue
    onClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
    handleClick: () => void
    todos: ListOfTodos
}

export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onClearCompleted,
    handleClick,
    todos
}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> tareas pendientes
            </span>
            <Filters
                filterSelected={filterSelected}
                handleFilterChange={handleFilterChange}
                handleClick={handleClick}
                todos={todos}
            />
            {completedCount > 0 && (
                <button
                    className='clear-completed'
                    onClick={onClearCompleted}
                >
                    Borrar completados
                </button>
            )}
        </footer>
    )
}