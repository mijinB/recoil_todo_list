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

interface IForm {
    errors: {
        email: {
            message: string;
        };
    };
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ToDoList() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });

    /**@function onValid
     * 1. submit의 data를 받아 출력
     */
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            setError(
                "password1",
                {
                    message: "Password are not the same",
                },
                { shouldFocus: true }
            );
        }
        /* setError("extraError", {
            message: "Server offline.",
        }); */
    };
    console.log(errors);

    return (
        <div>
            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    placeholder="Email"
                />
                <span>{errors?.email?.message}</span>
                <input
                    {...register("firstName", {
                        required: "firstName is required",
                        validate: {
                            noMijin: (value) => !value.includes("mijin") || "no mijins allowed",
                        },
                    })}
                    placeholder="First Name"
                />
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName", { required: "lastName is required" })} placeholder="Last Name" />
                <span>{errors?.lastName?.message}</span>
                <input
                    {...register("username", { required: "username is required", minLength: 10 })}
                    placeholder="Username"
                />
                <span>{errors?.username?.message}</span>
                <input
                    {...register("password", { required: "Password is required", minLength: 5 })}
                    placeholder="Password"
                />
                <span>{errors?.password?.message}</span>
                <input
                    {...register("password1", { required: "Password1 is required", minLength: 5 })}
                    placeholder="Password1"
                />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                {/* <span>{errors?.extraError?.message}</span> */}
            </form>
        </div>
    );
}

export default ToDoList;
