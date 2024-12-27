import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDiffStore } from "./diffStore";
import { db } from "./db";
import { useEffect, useState } from "react";

export function SaveDiffsDialog() {
  const { inputs, commonClasses, diffClasses } = useDiffStore((state) => state);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savingState, setSavingState] = useState("");

  useEffect(() => {
    setName(`${diffClasses.length} diffs @${new Date().toLocaleString()}`);
  }, [diffClasses]);

  async function saveDiffs() {
    try {
      setSavingState("Saving...");
      setIsSaving(true);
      const diffs = {
        inputs,
        commonClasses,
        diffClasses,
        name: name,
        createdAt: new Date().toLocaleString(),
      };
      const id = await db.diffs.add(diffs);
      setSavingState(`Saved diffs with id: ${id}`);
      setIsSaving(false);
    } catch (error) {
      setSavingState("Failed to save diffs");
      console.error("Failed to save diffs:", error);
      setIsSaving(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-lg
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200 mb-6"
          onClick={() => {
            setSavingState(() => "");
            setName(() => `${diffClasses.length} diffs @${new Date().toLocaleString()}`);
          }}
        >
          Save
        </button>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-50">Save Diffs</DialogTitle>
          <DialogDescription>
            Save diffs. The data is stored in your browser's indexDB. No data
            uploaded.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="dark:text-slate-50">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3 dark:text-slate-50"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        {savingState && (
          <div className="text-center text-sm text-gray-400">{savingState}</div>
        )}
        <DialogFooter>
          <Button type="submit" onClick={saveDiffs} disabled={isSaving}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
