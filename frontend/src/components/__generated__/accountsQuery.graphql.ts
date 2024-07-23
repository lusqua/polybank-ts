/**
 * @generated SignedSource<<83f279db88cfe97054f474aaee6cf5c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type accountsQuery$variables = Record<PropertyKey, never>;
export type accountsQuery$data = {
  readonly accounts: ReadonlyArray<{
    readonly _id: string;
    readonly balance: number;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type accountsQuery = {
  response: accountsQuery$data;
  variables: accountsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "accounts",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "balance",
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
    "name": "accountsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "accountsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5eb14e071460a85fb344fdc9e725bc22",
    "id": null,
    "metadata": {},
    "name": "accountsQuery",
    "operationKind": "query",
    "text": "query accountsQuery {\n  accounts {\n    _id\n    name\n    balance\n  }\n}\n"
  }
};
})();

(node as any).hash = "86410b546814006c8117c130725d2f84";

export default node;
