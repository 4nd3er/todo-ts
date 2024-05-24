import { todoTitle } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
    onAddTodo: ({ title }: todoTitle) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
    return (
        <header className="header">
            <h1>
                todo
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"
                    alt="imagen TS"
                    style={{ width: '60px', height: '60px' }}
                />
            </h1>
            <CreateTodo onAddTodo={onAddTodo} />
        </header>
    )
}