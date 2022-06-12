import axios from "axios";

function throwSyntaxError() {
  throw new Error("Syntax error, call getRPC with (username, password, URL)");
}

export function getRPC(username: string, password: string, URL: string) {
  if (!username) {
    throwSyntaxError();
  }
  if (!password) {
    throwSyntaxError();
  }
  if (!URL) {
    throwSyntaxError();
  }

  return async function rpc(method: string, params: any[]) {
    const promise = new Promise((resolutionFunc, rejectionFunc) => {
      const options = {
        auth: {
          username,
          password,
        },
      };
      const data = {
        jsonrpc: "2.0",
        id: Math.random(),
        method,
        params,
      };

      try {
        const rpcResponse = axios.post(URL, data, options);

        rpcResponse
          .then((re) => {
            const result = re.data.result;
            resolutionFunc(result);
          })
          .catch((e) => {
            if (e.response) {
              //We were able to connect to the wallet but something was wrong with our request

              const { response } = e;
              const { request, ...errorObject } = response;
              rejectionFunc({
                status: e.response.status,
                statusText: e.response.statusText,
                error: "Could connect to Raven core node but got an error",
              });
            } else if (e.request) {
              //Could NOT connect to wallet

              rejectionFunc({
                error: "Could not communicate with Raven core node",
                description:
                  "Are you sure that the URL is corect? The URL is usually something like http://localhost:8766",
              });
            }
          });
      } catch (e) {
        rejectionFunc(e.response);
      }
    });
    return promise;
  };
}

export const methods = {
  issue: "issue",
  issuerestrictedasset: "issuerestrictedasset",
  issuequalifierasset: "issuequalifierasset",
  reissuerestrictedasset: "reissuerestrictedasset",
  issueunique: "issueunique",
  transfer: "transfer",
  transferfromaddress: "transferfromaddress",
  transferfromaddresses: "transferfromaddresses",
  transferqualifier: "transferqualifier",
  reissue: "reissue",
  listmyassets: "listmyassets",
  listassets: "listassets",
  setmocktime: "setmocktime",
  generate: "generate",
  setgenerate: "setgenerate",
  generatetoaddress: "generatetoaddress",
  getnetworkhashps: "getnetworkhashps",
  sendtoaddress: "sendtoaddress",
  sendfromaddress: "sendfromaddress",
  settxfee: "settxfee",
  getreceivedbyaddress: "getreceivedbyaddress",
  getreceivedbyaccount: "getreceivedbyaccount",
  listreceivedbyaddress: "listreceivedbyaddress",
  listreceivedbyaccount: "listreceivedbyaccount",
  getbalance: "getbalance",
  getblockhash: "getblockhash",
  waitforblockheight: "waitforblockheight",
  waitforblock: "waitforblock",
  waitfornewblock: "waitfornewblock",
  move: "move",
  sendfrom: "sendfrom",
  listtransactions: "listtransactions",
  listaccounts: "listaccounts",
  walletpassphrase: "walletpassphrase",
  getblocktemplate: "getblocktemplate",
  listsinceblock: "listsinceblock",
  sendmany: "sendmany",
  addmultisigaddress: "addmultisigaddress",
  createmultisig: "createmultisig",
  listunspent: "listunspent",
  getblock: "getblock",
  getblockheader: "getblockheader",
  getchaintxstats: "getchaintxstats",
  gettransaction: "gettransaction",
  getrawtransaction: "getrawtransaction",
  createrawtransaction: "createrawtransaction",
  signrawtransaction: "signrawtransaction",
  sendrawtransaction: "sendrawtransaction",
  testmempoolaccept: "testmempoolaccept",
  combinerawtransaction: "combinerawtransaction",
  fundrawtransaction: "fundrawtransaction",
  gettxout: "gettxout",
  gettxoutproof: "gettxoutproof",
  lockunspent: "lockunspent",
  importprivkey: "importprivkey",
  importaddress: "importaddress",
  importpubkey: "importpubkey",
  importmulti: "importmulti",
  verifychain: "verifychain",
  pruneblockchain: "pruneblockchain",
  keypoolrefill: "keypoolrefill",
  getrawmempool: "getrawmempool",
  estimatefee: "estimatefee",
  estimatesmartfee: "estimatesmartfee",
  estimaterawfee: "estimaterawfee",
  prioritisetransaction: "prioritisetransaction",
  setban: "setban",
  setnetworkactive: "setnetworkactive",
  getmempoolancestors: "getmempoolancestors",
  getmempooldescendants: "getmempooldescendants",
  getblockhashes: "getblockhashes",
  getspentinfo: "getspentinfo",
  getaddresstxids: "getaddresstxids",
  getaddressbalance: "getaddressbalance",
  getaddressdeltas: "getaddressdeltas",
  getaddressutxos: "getaddressutxos",
  getaddressmempool: "getaddressmempool",
  bumpfee: "bumpfee",
  logging: "logging",
  disconnectnode: "disconnectnode",
  echojson: "echojson",
  rescanblockchain: "rescanblockchain",
  listaddressesbyasset: "listaddressesbyasset",
  listassetbalancesbyaddress: "listassetbalancesbyaddress",
  sendmessage: "sendmessage",
  requestsnapshot: "requestsnapshot",
  getsnapshotrequest: "getsnapshotrequest",
  listsnapshotrequests: "listsnapshotrequests",
  cancelsnapshotrequest: "cancelsnapshotrequest",
  distributereward: "distributereward",
  getdistributestatus: "getdistributestatus",
  getsnapshot: "getsnapshot",
  purgesnapshot: "purgesnapshot",
  stop: "stop",
  getkawpowhash: "getkawpowhash",
};
