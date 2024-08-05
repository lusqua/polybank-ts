import { createClient } from "graphql-ws";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  Observable,
  SubscribeFunction,
} from "relay-runtime";
import { RelayObservable } from "relay-runtime/lib/network/RelayObservable";

const HTTP_ENDPOINT =
  import.meta.env.VITE_HTTP_ENDPOINT || "http://localhost:4000/graphql";

const WS_ENDPOINT =
  import.meta.env.VITE_WS_ENDPOINT || "ws://localhost:4000/graphql";

const wsClient = createClient({
  url: WS_ENDPOINT,
});

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return await resp.json();
};

const subscribe: SubscribeFunction = (operation, variables) => {
  return Observable.create((sink) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink
    );
  });
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn, subscribe),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
