const docs = require("./docs.json");

const keys = Object.keys(docs);

const result = [];

result.push(`
export const methods ={
`);

for (let key of keys) {
  if (!key) {
    continue;
  }
  const doc = docs[key];

  result.push(`\r\n\r\n\r\n\r\n\r\n\r\n/** ${doc}**/`);
  result.push(`\n${key}:'${key}',`);
}

result.push("\n}");

require("fs").writeFileSync("./docs.ts", result.join(""));
