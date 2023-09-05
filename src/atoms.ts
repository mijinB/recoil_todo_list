import { atom, selector } from "recoil";

export const isDarkAtom = atom({
    key: "isDark",
    default: localStorage.getItem("isdarkmode") ?? false,
});

export const initCategories: string[] = ["TO_DO", "DOING", "DONE"];

export interface IToDo {
    id: number;
    text: string;
    category: string;
}

export const categoryState = atom<string>({
    key: "category",
    default: initCategories[0],
});

export const categoriesState = atom<string[]>({
    key: "categories",
    default: JSON.parse(localStorage.getItem("categories") ?? JSON.stringify(initCategories)),
});

export const toDoState = atom<IToDo[]>({
    key: "toDos",
    default: JSON.parse(localStorage.getItem("toDos") ?? "[]"),
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return toDos.filter((toDo) => toDo.category === category);
    },
});
