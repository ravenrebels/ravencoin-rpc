const RavencoinRPC = require("./dist/index.cjs");
test("Non existing 3rd party service getblockcount", async () => {
  const rpc = RavencoinRPC.getRPC(
    "anon",
    "anon",
    "https://rvn-rpc-mainnet.ting.finance/rpc"
  );
  const count = await rpc("getblockcount", []);

  const moreThanZero = count > 0;

  expect(moreThanZero).toBe(true);
});
test("3rd party service getblockcount", async () => {
  const rpc = RavencoinRPC.getRPC(
    "anon",
    "anon",
    "https://rvn-rpc-mainnet.VERYWRONG.ting.finance/rpc"
  );
  let error = null;
  try {
    const count = await rpc("getblockcount", []);
  } catch (e) {
    error = e;
  }
  const errorExists = !!error;
  expect(errorExists).toBe(true);
});
test("3rd party service incorrect method", async () => {
  const rpc = RavencoinRPC.getRPC(
    "anon",
    "anon",
    "https://rvn-rpc-mainnet.ting.finance/rpc"
  );
  const method = "getblockcountWRONG";
  const params = [];
  let hasError = false;
  let theError = null;
  try {
    const count = await rpc(method, params);
  } catch (e) {
    hasError = true;
    theError = e;
  }

  expect(hasError).toBe(true);
  expect(theError.error).toBe("Not in whitelist");
  expect(theError.description).toBe(
    'Could connect to Raven core node but got an error. Method "getblockcountWRONG"'
  );
});
