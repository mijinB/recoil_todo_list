import { styled } from "styled-components";

const ThemeModeWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px 40px;
`;

const ThemeModeToggle = styled.input.attrs({ id: "toggle", type: "checkbox" })`
    position: absolute;
    left: -10000px;
`;

const ThemeModeLabel = styled.label.attrs({ htmlFor: "toggle" })`
    display: block;
    position: relative;
    width: 62px;
    height: 33px;
    border-radius: 24px;
    background-color: ${(props) => props.theme.boxColor};
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.textColor};
    transition: all 0.25s ease-in;
    cursor: pointer;
    &::after {
        position: absolute;
        top: 3px;
        left: ${(props) => props.theme.contentLeft};
        color: ${(props) => props.theme.primaryColor};
        font-size: 23px;
        transition: all 0.5s ease-out;
        content: "${(props) => props.theme.contentText}";
    }
`;

interface IClickEvent {
    clickEvent: React.MouseEventHandler<HTMLInputElement>;
}

function ThemeModeButton({ clickEvent }: IClickEvent) {
    return (
        <ThemeModeWrapper>
            <ThemeModeToggle onClick={clickEvent} />
            <ThemeModeLabel />
        </ThemeModeWrapper>
    );
}

export default ThemeModeButton;
