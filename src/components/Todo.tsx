import { useEffect, useRef, useState } from "react"
import { Todo as TodoType, todoId, todoTitle } from "../types"

// ? Para extender el interface se hace de la siguiente manera
interface Props extends TodoType {
    handleRemove: ({ id }: todoId) => void
    handleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    setTitle: (id: todoId, title: todoTitle) => void
    todoEdit: string
    setTodoEdit: (completed: string) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, handleRemove, handleCompleted, todoEdit,
    setTodoEdit, setTitle }) => {
    const [editedTitle, setEditedTitle] = useState(title)
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== title) {
                setTitle({ id }, { title: editedTitle });
            }

            if (editedTitle === '') handleRemove({ id });

            setTodoEdit('');
        }

        if (e.key === 'Escape') {
            setEditedTitle(title)
            setTodoEdit('')
        }
    }

    useEffect(() => {
        inputEditTitle.current?.focus();
    }, [todoEdit])

    return (
        <>
            <div className="view">
                <input
                    className="toggle"
                    checked={completed}
                    type="checkbox"
                    onChange={(e) => { handleCompleted({ id, completed: e.target.checked }) }}
                />
                <label>{title}</label>
                <button
                    className="destroy"
                    onClick={() => {
                        handleRemove({ id })
                    }}
                />
            </div>
            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setTodoEdit('') }}
                ref={inputEditTitle}
            />
        </>
    )
}