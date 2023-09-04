import { useForm } from "react-hook-form";

/* function TodoList() {
    const [todo, setTodo] = useState("");
    const [todoError, setTodoError] = useState(""); */

/**@function onChange
 * 1. setTodo 사용해서 todo input 값으로 변경
 * 2. setTodoError 사용해서 todoError 초기화
 */
/*     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;

        setTodoError("");
        setTodo(value);
    }; */

/**@function onSubmit
 * 1. <from>의 submit 기본 동작(reLoad) 막기
 * 2. 입력된 todo가 10글자 미만이면 todoError에 "To do should be longer" 대입
 * 3. 10글자 이상이면 "submit" 출력
 */
/*     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (todo.length < 10) {
            return setTodoError("To do should be longer");
        }
        console.log("submit");
    }; */

/*     return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={todo} onChange={onChange} placeholder="Write a to do" />
                <button>Add</button>
                {todoError ?? todoError}
            </form>
        </div>
    );
} */

function ToDoList() {
    const { register, handleSubmit, formState } = useForm();

    /**@function onValid
     * 1. submit의 data를 받아 출력
     */
    const onValid = (data: any) => {
        console.log(data);
    };
    console.log(formState.errors);

    return (
        <div>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", { required: true })} placeholder="Email" />
                <input {...register("firstName", { required: true })} placeholder="First Name" />
                <input {...register("lastName", { required: true })} placeholder="Last Name" />
                <input {...register("username", { required: true, minLength: 10 })} placeholder="Username" />
                <input
                    {...register("password", { required: "Password is required", minLength: 5 })}
                    placeholder="Password"
                />
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
