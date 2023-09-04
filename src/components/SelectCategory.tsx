import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";

function SelectCategory() {
    const [category, setCategory] = useRecoilState(categoryState);

    /**@function onInput
     * 1. <select>에서 선택한 category로 categoryState(atom) 값 변경
     */
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
        </select>
    );
}

export default SelectCategory;
