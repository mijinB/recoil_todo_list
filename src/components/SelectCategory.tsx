import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, categoryState } from "../atoms";

function SelectCategory() {
    const categories = useRecoilValue(categoriesState);
    const setCategory = useSetRecoilState(categoryState);

    //     /**@function onInput
    //      * 1. <select>에서 선택한 category로 categoryState(atom) 값 변경
    //      */
    //     const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    //         setCategory(event.currentTarget.value as any);
    //     };

    //     const addCategory = () => {};

    //     return (
    //         <>
    //             <select value={category} onInput={onInput}>
    //                 <option value={Categories.TO_DO}>To Do</option>
    //                 <option value={Categories.DOING}>Doing</option>
    //                 <option value={Categories.DONE}>Done</option>
    //             </select>
    //             <button onClick={addCategory}>+Category</button>
    //         </>
    //     );

    /**@function 
     * 1. 클릭한 <button> category로 categoryState(atom) 값 변경
     */
    const showCategoryContent = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCategory(event.currentTarget.innerText);
    };

    return (
        <>
            {categories.map((category) => (
                <button key={categories.indexOf(category)} onClick={showCategoryContent}>
                    {category.replace("_", " ")}
                </button>
            ))}
        </>
    );
}

export default SelectCategory;
