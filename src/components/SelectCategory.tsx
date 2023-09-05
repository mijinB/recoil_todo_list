import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState, categoryState } from "../atoms";

function SelectCategory() {
    const [categories, setCategories] = useRecoilState(categoriesState);
    const setCategory = useSetRecoilState(categoryState);

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

    return (
        <>
            {categories.map((category) => (
                <button key={categories.indexOf(category)} value={category} onClick={showCategoryContent}>
                    {category.replace("_", " ")}
                </button>
            ))}
            <button onClick={addCategory}>+Category</button>
        </>
    );
}

export default SelectCategory;
