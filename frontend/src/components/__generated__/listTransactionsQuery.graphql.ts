/**
 * @generated SignedSource<<c34d116c6689549733bbfcb3f6eff831>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type listTransactionsQuery$variables = Record<PropertyKey, never>;
export type listTransactionsQuery$data = {
  readonly transactions: ReadonlyArray<{
    readonly _id: string;
    readonly amount: number;
    readonly receiver: {
      readonly name: string;
    };
    readonly sender: {
      readonly name: string;
    };
  } | null | undefined> | null | undefined;
};
export type listTransactionsQuery = {
  response: listTransactionsQuery$data;
  variables: listTransactionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "transactions",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "_id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "amount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "sender",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "receiver",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "listTransactionsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "listTransactionsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "597a20444f4438d6d51f446aa13a1956",
    "id": null,
    "metadata": {},
    "name": "listTransactionsQuery",
    "operationKind": "query",
    "text": "query listTransactionsQuery {\n  transactions {\n    _id\n    amount\n    sender {\n      name\n    }\n    receiver {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0cbf9c9bf2eef496dc3bca4b8972efd6";

export default node;
