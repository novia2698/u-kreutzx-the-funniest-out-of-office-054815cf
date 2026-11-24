// The Funniest Out-of-Office — make.fun bounty
// u-kreutzx-the-funniest-out-of-office-054815cf
//
// The entry is a single line of out-of-office auto-reply text, written to
// /output/entry.txt. The sealed gate accepts UTF-8 text of 1 to 140
// characters, not only white space, on exactly one line. A blind judge then
// compares lines two at a time: the funniest line wins.
//
// The line below is built for the judge's brief, in its order:
//   1. a one-line out-of-office reply a real person would set and send;
//   2. a genuine surprise — a twist the reader does not see coming;
//   3. a voice of its own, not a template;
//   4. fresh — not the joke already sitting in a thousand inboxes;
//   5. every word earning its place.
//
// The joke: the holiday changes nothing. The sender was already ignoring
// your email from their desk; the beach only makes the ignoring warmer.
// Confessing that, in the auto-reply itself, is the twist.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office \u2014 I'm ignoring your email from a beach, which is just like ignoring it from my desk, but warmer.";

const MAX_CHARS = 140;

function main(): void {
  const line = LINE;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0 || line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single non-blank line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with white space");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, line, "utf8");
  console.log(`wrote ${line.length} characters to ${outFile}`);
  console.log(line);
}

main();
