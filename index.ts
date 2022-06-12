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
