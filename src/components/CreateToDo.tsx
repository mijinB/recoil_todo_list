import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    /**@function onSubmit
     * 1. toDos List에 인자로 받은 toDo의 값과 id(현재date), category("TO_DO") 추가
     * 2. input 빈 값으로 초기화
     */
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [{ id: Date.now(), text: toDo, category: "TO_DO" }, ...oldToDos]);
        setValue("toDo", "");
    };

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
