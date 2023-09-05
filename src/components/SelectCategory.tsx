import { useRecoilState } from "recoil";
import { categoriesState, categoryState } from "../atoms";
import { useEffect } from "react";
import { styled } from "styled-components";

const CategoryButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    overflow-wrap: anywhere;
    transition: background-color 0.25s ease-out;
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

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    return (
        <>
            {categories.map((categoryItem) => (
                <CategoryButton
                    key={categories.indexOf(categoryItem)}
                    value={categoryItem}
                    disabled={categoryItem === category}
                    onClick={showCategoryContent}
                >
                    {categoryItem.replace("_", " ")}
                </CategoryButton>
            ))}
            <CategoryAddButton onClick={addCategory}>+Category</CategoryAddButton>
        </>
    );
}

export default SelectCategory;
