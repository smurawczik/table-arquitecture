import { TableState } from "../shared/table.types";

type SharedDimensions = {
  row: string[];
  column: string[];
  inactive: string[];
};

export interface BuilderSliceState extends TableState {
  dimensions: SharedDimensions;
  dimensionsByLine: Record<string, Pick<SharedDimensions, "row" | "inactive">>;
}
