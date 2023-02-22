import { composeGridPositions } from "@/common/utils/css";
import { GridPositions } from "@/types/api/style";
import { FC } from "react";

interface Props {
  title: string;
  text: string;
  gridPositions: GridPositions;
}

export const TextBox: FC<Props> = ({ title, text, gridPositions }) => {
  return (
    <div className={`${composeGridPositions(gridPositions)}`}>
      <h1 className="text-3xl uppercase">{title}</h1>
      <h3 className="text-1xl">{text}</h3>
    </div>
  );
};
