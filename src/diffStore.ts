import { create } from "zustand";
import { calcDiff } from "./tool_functions";

export type DiffState = {
  inputs: { name: string; values: string[]; id: number }[];
  commonClasses: string[];
  diffClasses: { name: string; values: string[]; id: number }[];
  loadDiffs: ({inputs, commonClasses, diffClasses}:Pick<DiffState, "inputs" | "commonClasses" | "diffClasses">) => void;
  reset: () => void;
  expandInputs: () => void;
  shrinkInputs: () => void;
  changeTitle: (id: number, title: string) => void;
  changeInputValue: (id: number, value: string) => void;
};

export const useDiffStore = create<DiffState>((set) => ({
  inputs: [
    { name: "", values: [], id: 0 },
    { name: "", values: [], id: 1 },
  ],
  commonClasses: [],
  diffClasses: [],
  reset: () => set(() => ({
    inputs: [
      { name: "", values: [], id: 0 },
      { name: "", values: [], id: 1 },
    ],
    commonClasses: [],
    diffClasses: [],
  })),
  loadDiffs: ({inputs, commonClasses, diffClasses}) =>
    set(() => ({inputs, commonClasses, diffClasses})),
  expandInputs: () =>
    set((state) => ({
      inputs: [
        ...state.inputs,
        { name: "", values: [], id: state.inputs.length },
      ],
    })),
  shrinkInputs: () =>
    set((state) => {
      if (state.inputs.length > 2) {
        return {
          inputs: state.inputs.slice(0, -1),
          diffClasses: state.diffClasses.slice(0, -1),
        };
      } else {
        return state;
      }
    }),
  changeTitle: (id, title) =>
    set((state) => {
      if (state.inputs.some((input) => input.id === id)) {
        const newInputs = state.inputs.map((input) => {
          if (input.id === id) {
            return { ...input, name: title };
          } else {
            return input;
          }
        });
        const newDiffClasses = state.diffClasses.map((diff) => {
          if (diff.id === id) {
            return { ...diff, name: `Diff ${id + 1} from ${title}` };
          } else {
            return diff;
          }
        });
        return { inputs: newInputs, diffClasses: newDiffClasses };
      } else return state;
    }),
  changeInputValue: (id, value) =>
    set((state) => {
      if (state.inputs.some((input) => input.id === id)) {
        const newInputs = state.inputs.map((input) => {
          if (input.id === id) {
            return { ...input, values: value.split(/\s+/) };
          } else {
            return input;
          }
        });
        const { common, diffs } = calcDiff(
          newInputs.map((input) => input.values.join(" "))
        );
        // console.log(common, diffs);
        return {
          inputs: newInputs,
          commonClasses: common.split(" "),
          diffClasses: diffs.map((diff, i) => ({
            name: `Diff ${i + 1} from ${newInputs[i].name}`,
            values: diff.split(" "),
            id: i,
          })),
        };
      } else return state;
    }),
}));
