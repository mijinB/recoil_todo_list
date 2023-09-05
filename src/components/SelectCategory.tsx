import { useRecoilState } from "recoil";
import { categoriesState, categoryState, toDoState } from "../atoms";
import { useEffect } from "react";
import { styled } from "styled-components";

const CategoryButtonsWrapper = styled.div`
    position: relative;
`;

const CategoryButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    overflow-wrap: anywhere;
    transition: all 0.25s ease-out;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.accentBgColor};
        color: ${(props) => props.theme.accentTextColor};
    }
    &:disabled {
        border: 4px solid ${(props) => props.theme.accentTextColor};
        background-color: ${(props) => props.theme.accentBgColor};
        color: ${(props) => props.theme.accentTextColor};
    }
`;

const CategoryDeleteButton = styled.button`
    position: absolute;
    top: -9px;
    right: -9px;
    width: 23px;
    height: 23px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    font-size: 14px;
    font-weight: 600;
    transition: all 0.25s ease-out;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.accentTextColor};
        color: red;
    }
`;

const CategoryAddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.accentTextColor};
    font-weight: 600;
    overflow-wrap: anywhere;
    transition: all 0.25s ease-out;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.secondBoxColor};
    }
`;

function SelectCategory() {
    const [categories, setCategories] = useRecoilState(categoriesState);
    const [category, setCategory] = useRecoilState(categoryState);
    const [toDos, setToDos] = useRecoilState(toDoState);

    /**@function showCategoryContent
     * 1. 클릭한 <button> category로 categoryState(atom) 값 변경해서 카테고리 이동
     */
    const showCategoryContent = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCategory(event.currentTarget.value);
    };

    /**@function addCategory
     * 1. 새로운 카테고리의 이름을 입력받아서 변수(newCategory)에 대입
     * 2. newCategory 유무 확인 후 없으면 추가하지 않음
     * 3. newCategory가 이미 categories에 포함되어 있는지 확인
     * 4. 이미 포함되어 있다면, 중복을 알려주는 alert 띄우고 추가하지 않음
     * 5. 포함되어 있지 않다면, categories에 newCategory 추가하고
     * 6. 추가한 카테고리로 이동(categoryState(atom) 변경)
     */
    const addCategory = () => {
        const newCategory = prompt("new category name📝");

        if (newCategory) {
            if (categories.includes(newCategory)) {
                alert("It already exists.");
                return;
            }
            setCategories([...categories, newCategory]);
            setCategory(newCategory);
        }
    };

    /**@function onDelete
     * 1. confirm 창으로 category를 정말 삭제할 건지 확인 후 아래 기능 수행, 취소를 누르면 아무것도 하지않음
     * 2. 삭제하려는 category가 현재 focus인 category라면, "TO_DO" category로 focus 이동
     * 3. categories List에서 해당 category 삭제
     * 4. toDos List에서 해당 category인 todo들 모두 삭제
     */
    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const isConfirmedDeletion = window.confirm(
            "카테고리를 정말 삭제하시겠습니까?\n해당 카테고리에 포함된 data가 모두 삭제됩니다."
        );

        if (isConfirmedDeletion) {
            if (event.currentTarget.value === category) {
                setCategory("TO_DO");
            }

            setCategories((prevCategories) =>
                prevCategories.filter((categoriesItem) => categoriesItem !== event.currentTarget.value)
            );
            setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.category !== event.currentTarget.value));
        }
    };

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(toDos));
    }, [toDos]);

    return (
        <>
            {categories.map((categoryItem) => (
                <CategoryButtonsWrapper>
                    <CategoryButton
                        key={categories.indexOf(categoryItem)}
                        value={categoryItem}
                        disabled={categoryItem === category}
                        onClick={showCategoryContent}
                    >
                        {categoryItem.replace("_", " ")}
                    </CategoryButton>
                    <CategoryDeleteButton
                        key={categories.indexOf(categoryItem) + "xx"}
                        value={categoryItem}
                        onClick={onDelete}
                    >
                        ✖
                    </CategoryDeleteButton>
                </CategoryButtonsWrapper>
            ))}
            <CategoryAddButton onClick={addCategory}>+Category</CategoryAddButton>
        </>
    );
}

export default SelectCategory;
