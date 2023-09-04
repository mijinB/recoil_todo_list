import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    /**@function onClick
     * 1. MouseEvent를 인자로 받아서 수정할 category를 변수(name)에 대입
     * 2. category를 수정하고자 하는 toDo의 index 찾아서 변수(targetIndex)에 대입
     * 3. targetIndex의 index 값을 사용해서 수정하고자 하는 toDo의 object를 변수(oldToDo)에 대입
     * 4. 컴포넌트 props로 받은 id, text는 그 값을 유지하고 category는 수정될 값(name)으로 변수(newToDo)에 대입
     */
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;

        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = { id, text, category: name };
            console.log(oldToDo, newToDo);
            return oldToDos;
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== "TO_DO" && (
                <button name="TO_DO" onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== "DOING" && (
                <button name="DOING" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== "DONE" && (
                <button name="DONE" onClick={onClick}>
                    Done
                </button>
            )}
        </li>
    );
}

export default ToDo;
