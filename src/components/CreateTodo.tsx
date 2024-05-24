import { useState } from "react";
import { todoTitle } from "../types";

interface Props {
    onAddTodo: ({ title }: todoTitle) => void;
}

export const CreateTodo: React.FC<Props> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onAddTodo({ title: inputValue });
        setInputValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='new-todo'
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value)}}
                placeholder="Que quieres hacer?"
                autoFocus
            />
        </form>
    )
}
