import { GridPositions } from "@/types/api/style";

export const composeGridPositions = ({ column, row }: GridPositions) => {
  console.log(column, row);
  return `col-start-${column.start} col-end-${column.end} row-start-${row.start} row-end-${row.end}`;
};
