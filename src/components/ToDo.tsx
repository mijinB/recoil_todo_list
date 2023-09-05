import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "../atoms";

function ToDo({ id, text, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(categoriesState);

    /**@function changeCategoryOnClick
     * 1. 수정할 categoryState를 인자로 받음
     * 2. category를 수정하고자 하는 toDo의 index 찾아서 변수(targetIndex)에 대입
     * 3. 컴포넌트 props로 받은 id, text는 그 값을 유지하고 category는 수정될 값(categoryState)으로 변수(newToDo)에 대입
     * 4. 원래의 toDos List 값들을 그대로 새로운 List 변수(newToDos)에 대입
     * 5. newToDos ⇒ splice 사용해서 targetIndex 위치의 1개의 요소를 newToDo 값으로 교체
     * 6. 수정된 newToDos로 ToDos List 변경(setToDos)
     */
    const changeCategoryOnClick = (categoryState: IToDo["category"]) => {
        setToDos((prevToDos) => {
            const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
            const newToDo: IToDo = { id, text, category: categoryState };
            const newToDos = [...prevToDos];

            newToDos.splice(targetIndex, 1, newToDo);
            return newToDos;
        });
    };

    const onDelete = () => {
        setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
    };

    return (
        <li>
            <span>{text}</span>
            {categories.map(
                (categoriesItem) =>
                    category !== categoriesItem && (
                        <button
                            key={categories.indexOf(categoriesItem)}
                            onClick={() => changeCategoryOnClick(categoriesItem)}
                        >
                            {categoriesItem.replace("_", " ")}
                        </button>
                    )
            )}
            <button onClick={onDelete}>✖</button>
            <hr />
        </li>
    );
}

export default ToDo;
