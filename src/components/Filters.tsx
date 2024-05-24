import { FilterValue, ListOfTodos } from "../types"
import { FILTER_BUTTONS } from "../consts"

interface Props {
    handleFilterChange: (filter: FilterValue) => void
    filterSelected: FilterValue
    handleClick: () => void
    todos: ListOfTodos
}

export const Filters: React.FC<Props> = ({ filterSelected, handleFilterChange }) => {
    return (
        <ul className="filters">
            {Object.entries(FILTER_BUTTONS).map(([key, { href, literal }]) => {
                return (
                    <li key={key}>
                        <a
                            href={href}
                            className={`${filterSelected === key ? 'selected' : ''}`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleFilterChange(key as FilterValue)
                            }}
                        >
                            {literal}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
