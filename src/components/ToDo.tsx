import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "../atoms";
import { styled } from "styled-components";

const ToDoItemWrapper = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px 0 20px;
`;

const ToDoItemText = styled.span`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
`;

const ToDoItemDelete = styled.button`
    width: 23px;
    height: 23px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 600;
    transition: all 0.25s ease-out;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.accentTextColor};
        color: red;
    }
`;

const ToDoItemCategoryWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-content: space-evenly;
    align-items: baseline;
    min-height: 55px;
    padding-right: 10px;
    margin: 15px 10px 0 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.secondBoxColor};
`;

const ToDoItemCategory = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0;
    border: none;
    background: none;
    color: ${(props) => props.theme.accentTextColor};
    font-size: 12px;
    font-weight: 600;
    transition: all 0.25s ease-out;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.accentBgColor};
    }
    &::before {
        content: "";
    }
    &::after {
        color: ${(props) => props.theme.textColor};
        font-size: 15px;
        cursor: default;
        content: "|";
    }
    &:last-child::after {
        content: "";
    }
`;

const ToDoItemCategoryText = styled.span`
    width: 60px;
    height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function ToDo({ id, text, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(categoriesState);

    /**@function changeCategoryOnClick
     * 1. 수정할 categoryState를 인자로 받음
     * 2. category를 수정하고자 하는 toDo의 index 찾아서 변수(targetIndex)에 대입
     * 3. 컴포넌트 props로 받은 id, text는 그 값을 유지하고 category는 수정될 값(categoryState)으로 변수(newToDo)에 대입
     * 4. 원래의 toDos List 값들을 그대로 새로운 List 변수(newToDos)에 대입
     * 5. newToDos ⇒ splice 사용해서 targetIndex 위치의 1개의 요소를 newToDo 값으로 교체
     * 6. 수정된 newToDos로 toDos List 변경(setToDos)
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

    /**@function onDelete
     * 1. toDos List에서 해당 toDo 제거
     */
    const onDelete = () => {
        setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id));
    };

    return (
        <>
            <ToDoItemWrapper>
                <ToDoItemText>
                    {text}
                    <ToDoItemDelete onClick={onDelete}>✖</ToDoItemDelete>
                </ToDoItemText>
                <ToDoItemCategoryWrapper>
                    {categories.map(
                        (categoriesItem) =>
                            category !== categoriesItem && (
                                <ToDoItemCategory
                                    key={categories.indexOf(categoriesItem)}
                                    onClick={() => changeCategoryOnClick(categoriesItem)}
                                >
                                    <ToDoItemCategoryText>{categoriesItem.replace("_", " ")}</ToDoItemCategoryText>
                                </ToDoItemCategory>
                            )
                    )}
                </ToDoItemCategoryWrapper>
            </ToDoItemWrapper>
            <hr />
        </>
    );
}

export default ToDo;
