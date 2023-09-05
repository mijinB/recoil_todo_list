import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import SelectCategory from "./SelectCategory";
import { styled } from "styled-components";

const Container = styled.div`
    max-width: 480px;
    padding: 0 20px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    margin: 100px 0 23px;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentTextColor};
    font-size: 40px;
    font-weight: 600;
`;

const CategoryWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 9px;
    margin-bottom: 20px;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);

    return (
        <Container>
            <Header>
                <Title>To Do</Title>
            </Header>
            <CategoryWrapper>
                <SelectCategory />
            </CategoryWrapper>
            <hr />
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </Container>
    );
}

export default ToDoList;
