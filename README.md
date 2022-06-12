# ravencoin-rpc

A package that will help you do RPC calls from Node.js to your Raven core node, that is your full Ravencoin node.


more info comin up, stay tuned!
```

const { getRPC } = require("@ravenrebels/ravencoin-rpc");

const rpc = getRPC("usernameSuperSecret", "passwordSuperSecret", "http://localhost:8766");

const promise = rpc("getassetdata", ["CATE"]);
promise.catch((e) => {
  console.dir(e);
});

promise.then((response) => {
  console.log(response);
});

```

will print out
```

{
  name: 'CATE',
  amount: 11704324644,
  units: 2,
  reissuable: 1,
  has_ipfs: 1,
  ipfs_hash: 'QmbAbFPTXM19EQU7yKMVLrF1trkgLckBna9C8nw3kmfXzh'
}

