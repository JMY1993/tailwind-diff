export function calcDiff(classNameArray: string[]): {
  common: string;
  diffs: string[];
} {
  if (!classNameArray.length) return { common: "", diffs: [] };

  const sets = classNameArray.map((item) => new Set(item.split(/\s+/)));
  let commonSet = new Set(sets[0]);

  for (let i = 1; i < sets.length; i++) {
    commonSet = new Set([...commonSet].filter((x) => sets[i].has(x)));
  }

  const diffs = sets.map((set) => new Set([...set].filter((x) => !commonSet.has(x))));

  return {
    common: [...commonSet].join(" "),
    diffs: diffs.map((diff) => [...diff].join(" ")),
  };
}

