import { Todo as TodoType, todoId } from "../types"

// ? Para extender el interface se hace de la siguiente manera
interface Props extends TodoType {
    handleRemove: ({ id }: todoId) => void
    handleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, handleRemove, handleCompleted }) => {
    return (
        <div className="view">
            <input
                className="toggle"
                checked={completed}
                type="checkbox"
                onChange={(e) => {handleCompleted({id, completed: e.target.checked})}}
            />
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {
                    handleRemove({ id })
                }}
            />
        </div>
    )
}