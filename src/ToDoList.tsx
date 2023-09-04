import { useState } from "react";

function TodoList() {
    const [todo, setTodo] = useState("");
    const [todoError, setTodoError] = useState("");

    /**@function onChange
     * 1. setTodo 사용해서 todo input 값으로 변경
     * 2. setTodoError 사용해서 todoError 초기화
     */
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;

        setTodoError("");
        setTodo(value);
    };

    /**@function onSubmit
     * 1. <from>의 submit 기본 동작(reLoad) 막기
     * 2. 입력된 todo가 10글자 미만이면 todoError에 "To do should be longer" 대입
     * 3. 10글자 이상이면 "submit" 출력
     */
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (todo.length < 10) {
            return setTodoError("To do should be longer");
        }
        console.log("submit");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={todo} onChange={onChange} placeholder="Write a to do" />
                <button>Add</button>
                {todoError ?? todoError}
            </form>
        </div>
    );
}

export default TodoList;
