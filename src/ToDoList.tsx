import { useForm } from "react-hook-form";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const { register, handleSubmit, setValue } = useForm<IForm>();

    /**@function onSubmit
     * 1. 인자로 받은 data의 값 확인
     * 2. input 빈 값으로 초기화
     */
    const handleValid = (data: IForm) => {
        console.log("add to do", data.toDo);
        setValue("toDo", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("toDo", {
                        required: "Please write a To Do",
                    })}
                    placeholder="Write a to do"
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
