import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";
import { useEffect } from "react";
import { styled } from "styled-components";

const ToDoForm = styled.form`
    display: flex;
    align-items: center;
    margin: 35px 0px;
`;

const ToDoInput = styled.input`
    width: 100%;
    padding: 6px 11px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.secondBoxColor};
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    line-height: 1.5;
    outline: none;
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const AddButton = styled.button`
    height: 33px;
    padding: 4px 11px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.accentTextColor};
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.accentBgColor};
        color: ${(props) => props.theme.accentTextColor};
    }
`;

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const category = useRecoilValue(categoryState);
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    /**@function onSubmit
     * 1. toDos List 변수에 인자로 받은 toDo의 값과 id(현재date), category(현재 선택한 category) 추가
     * 2. input 빈 값으로 초기화
     */
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [{ id: Date.now(), text: toDo, category }, ...oldToDos]);
        setValue("toDo", "");
    };

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(toDos));
    }, [toDos]);

    return (
        <ToDoForm onSubmit={handleSubmit(handleValid)}>
            <ToDoInput
                {...register("toDo", {
                    required: "Please write a To Do",
                })}
                placeholder="Write a to do"
            />
            <AddButton>ADD</AddButton>
        </ToDoForm>
    );
}

export default CreateToDo;
