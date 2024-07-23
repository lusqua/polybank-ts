/**
 * @generated SignedSource<<eea92ce9601a186b789b472d53863898>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type transferDrawerQuery$variables = Record<PropertyKey, never>;
export type transferDrawerQuery$data = {
  readonly accounts: ReadonlyArray<{
    readonly _id: string;
    readonly name: string;
  } | null | undefined> | null | undefined;
};
export type transferDrawerQuery = {
  response: transferDrawerQuery$data;
  variables: transferDrawerQuery$variables;
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
    "name": "transferDrawerQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "transferDrawerQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3c0f30b3ea7b763d5c1ff16f082a2e6c",
    "id": null,
    "metadata": {},
    "name": "transferDrawerQuery",
    "operationKind": "query",
    "text": "query transferDrawerQuery {\n  accounts {\n    _id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "90f89ec34520a467043a8805c03d182d";

export default node;
