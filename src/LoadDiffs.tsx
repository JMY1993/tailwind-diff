import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useDiffStore } from "./diffStore";
import { db } from "./db";
import { useState } from "react";
import {
  ClockIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

type DiffsListItem = {
  name: string;
  createdAt: string;
  id: number;
  numDiffs: number;
};

export function LoadDiffsDialog() {
  const loadDiffs = useDiffStore((state) => state.loadDiffs);
  // const [diffState, setDiffState] = useState<Parameters<
  //   typeof loadDiffs
  // > | null>(null);
  const [diffsList, setDiffsList] = useState<DiffsListItem[]>([]);
  const [loadingState, setLoadingState] = useState("");
  async function listDiffsFromDb() {
    try {
      const diffs = await db.diffs.toArray();
      setDiffsList(
        diffs.map(({ name, createdAt, id, diffClasses }) => ({
          name,
          createdAt,
          id,
          numDiffs: diffClasses.length,
        }))
      );
    } catch (error) {
      console.error("Failed to list diffs:", error);
      setLoadingState("Failed to list diffs");
    }
  }

  async function fetchDiffsFromDb(id: number) {
    try {
      const diffs = await db.diffs.get(id);
      if (diffs) {
        loadDiffs(diffs);
      }
    } catch (error) {
      console.error("Failed to fetch diffs:", error);
      setLoadingState("Failed to fetch diffs");
    }
  }

  async function removeDiffsFromDb(id: number) {
    try {
      await db.diffs.delete(id);
      listDiffsFromDb();
    } catch (error) {
      console.error("Failed to remove diffs:", error);
      setLoadingState("Failed to remove diffs");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={listDiffsFromDb}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-lg
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200 mb-6"
        >
          Load
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-50">Load Saved Diffs</DialogTitle>
          <DialogDescription>Choose from your previously saved diffs. The data is stored in your browser's indexDB. No data uploaded.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 p-6">
          {diffsList.map(({ name, createdAt, id, numDiffs }) => (
            <div 
              key={id} 
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-4
                transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
                transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                    <h3 className="text-lg font-medium text-gray-200 group-hover:text-white">
                      {name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center text-sm text-gray-400">
                      <ClockIcon className="mr-1.5 h-4 w-4" />
                      {createdAt}
                    </span>
                    <span className="flex items-center text-sm text-gray-400">
                      <DocumentDuplicateIcon className="mr-1.5 h-4 w-4" />
                      {numDiffs} diffs
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => fetchDiffsFromDb(id)}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-400 
                      transition-colors hover:bg-blue-500 hover:text-white"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => removeDiffsFromDb(id)}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-red-500/10 text-red-400 
                      transition-colors hover:bg-red-500 hover:text-white"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loadingState && (
          <div className="text-center text-sm text-gray-400">
            {loadingState}
          </div>
        )}
        {/* <DialogFooter>
          <Button type="submit">Load</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
