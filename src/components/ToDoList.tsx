import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IToDo {
    id: number;
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

interface IForm {
    toDo: string;
}

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState);
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
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
