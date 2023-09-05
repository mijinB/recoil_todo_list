import { useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";
import { useEffect } from "react";

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
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDo", {
                    required: "Please write a To Do",
                })}
                placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
