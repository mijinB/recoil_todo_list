import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);

    /**@function onClick
     * 1. 수정할 categoryState를 인자로 받음
     * 2. category를 수정하고자 하는 toDo의 index 찾아서 변수(targetIndex)에 대입
     * 3. 컴포넌트 props로 받은 id, text는 그 값을 유지하고 category는 수정될 값(categoryState)으로 변수(newToDo)에 대입
     * 4. 원래의 toDos List 값들을 그대로 새로운 List 변수(newToDos)에 대입
     * 5. newToDos ⇒ splice 사용해서 targetIndex 위치의 1개의 요소를 newToDo 값으로 교체
     * 6. 수정된 newToDos로 ToDos List 변경(setToDos)
     */
    const onClick = (categoryState: IToDo["category"]) => {
        setToDos((prevTodos) => {
            const targetIndex = prevTodos.findIndex((toDo) => toDo.id === id);
            const newToDo: IToDo = { id, text, category: categoryState };
            const newToDos = [...prevTodos];

            newToDos.splice(targetIndex, 1, newToDo);
            return newToDos;
        });
    };

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TO_DO && <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>}
            {category !== Categories.DOING && <button onClick={() => onClick(Categories.DOING)}>Doing</button>}
            {category !== Categories.DONE && <button onClick={() => onClick(Categories.DONE)}>Done</button>}
        </li>
    );
}

export default ToDo;
