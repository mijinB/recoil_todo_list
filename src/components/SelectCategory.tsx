import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, categoryState } from "../atoms";

function SelectCategory() {
    const categories = useRecoilValue(categoriesState);
    const setCategory = useSetRecoilState(categoryState);

    /**@function
     * 1. 클릭한 <button> category로 categoryState(atom) 값 변경
     */
    const showCategoryContent = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCategory(event.currentTarget.value);
    };

    return (
        <>
            {categories.map((category) => (
                <button key={categories.indexOf(category)} value={category} onClick={showCategoryContent}>
                    {category.replace("_", " ")}
                </button>
            ))}
        </>
    );
}

export default SelectCategory;
