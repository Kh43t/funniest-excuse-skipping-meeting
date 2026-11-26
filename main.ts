import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The excuse: the meeting hands me its own alibi. A blank agenda is the
// most honest thing about this meeting, so my absence matches it exactly.
const excuse =
  "This meeting's agenda is blank, so I'm submitting my absence in the same format.";

const destination = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

const characters = [...excuse].length;
const bytes = Buffer.byteLength(excuse, "utf8");

if (characters < 1 || characters > 200) {
  throw new Error(`excuse must be 1-200 characters, got ${characters}`);
}
if (excuse.includes("\n") || excuse.includes("\r")) {
  throw new Error("excuse must be a single line");
}
if (excuse.trim().length === 0) {
  throw new Error("excuse must not be only whitespace");
}
if (excuse !== excuse.trim()) {
  throw new Error("excuse must not start or end with whitespace");
}

mkdirSync(dirname(destination), { recursive: true });
writeFileSync(destination, excuse, "utf8");

console.log(`wrote ${characters} characters (${bytes} bytes) to ${destination}`);
