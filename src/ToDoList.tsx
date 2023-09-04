import { useState } from "react";

function TodoList() {
    const [todo, setTodo] = useState("");

    /**@function onChange
     * 1. setTodo 사용해서 todo input 값으로 변경
     */
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setTodo(value);
    };

    /**@function onSubmit
     * 1. <from>의 submit 기본 동작(reLoad) 막기
     * 2. 확인을 위한 출력문
     */
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(todo);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={todo} onChange={onChange} placeholder="Write a to do" />
                <button>Add</button>
            </form>
        </div>
    );
}

export default TodoList;
