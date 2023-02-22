import { CSSProperties, FC } from "react";

interface Props {
  title: string;
  text: string;
  style: CSSProperties;
}

export const TextBox: FC<Props> = ({ title, text, style }) => {
  return (
    <div style={style}>
      <h1 className="text-3xl uppercase">{title}</h1>
      <h3 className="text-1xl">{text}</h3>
    </div>
  );
};
