import { atom, selector } from "recoil";

export let Categories: string[] = ["TO_DO", "DOING", "DONE"];

export interface IToDo {
    id: number;
    text: string;
    category: string;
}

export const categoryState = atom<string>({
    key: "category",
    default: Categories[0],
});

export const categoriesState = atom<string[]>({
    key: "categories",
    default: Categories,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return toDos.filter((toDo) => toDo.category === category);
    },
});
