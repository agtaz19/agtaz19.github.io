// ---------------------------------------------------------------------------
// Tiny builders for the resources data tree. Use these instead of writing
// { kind: "leaf", ... } / { kind: "group", ... } objects by hand — same
// output shape, but no bracket-matching, no quoted "kind" keys, and (since
// this is JS, not JSON) trailing commas and comments are allowed.
// ---------------------------------------------------------------------------

// leaf(title, href, description?)
// description is optional. Pass it as:
//   "plain text"                              -> one line of plain text
//   ["intro text", ["link text", "https://.."], "and more text"]
//                                              -> mix of plain strings and
//                                                 [text, href] pairs, rendered
//                                                 as one flowing paragraph
export function leaf(title, href, description) {
  const item = { kind: "leaf", title, href };
  if (description) item.description = normalizeDescription(description);
  return item;
}

// group(label, children, intro?)
// children is an array of leaf(...) / group(...) results.
export function group(label, children, intro) {
  const item = { kind: "group", label, children };
  if (intro) item.intro = intro;
  return item;
}

// section(id, title, groups)
export function section(id, title, groups) {
  return { id, title, groups };
}

function normalizeDescription(description) {
  const parts = Array.isArray(description) ? description : [description];
  return parts.map((part) =>
    Array.isArray(part) ? { text: part[0], href: part[1] } : { text: part },
  );
}
