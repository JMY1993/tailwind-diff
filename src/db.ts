import Dexie, { type EntityTable } from "dexie";
import type { DiffState } from "./diffStore";

type Diff = Pick<DiffState, "commonClasses" | "diffClasses" | "inputs"> & {
  id: number;
  name: string;
  createdAt: string;
};

const db = new Dexie("FriendsDatabase") as Dexie & {
  diffs: EntityTable<
    Diff,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  diffs: "++id, inputs, commonClasses, diffClasses, name, createdAt", // primary key "id" (for the runtime!)
});

export type { Diff };
export { db };