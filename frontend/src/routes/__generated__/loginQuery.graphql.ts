/**
 * @generated SignedSource<<158e075e4e5282a1761fe0d6da5af091>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type loginQuery$variables = {
  email: string;
};
export type loginQuery$data = {
  readonly login: {
    readonly balance: number;
    readonly name: string;
  } | null | undefined;
};
export type loginQuery = {
  response: loginQuery$data;
  variables: loginQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "loginQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "loginQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bea10ce32db1019bd412226e2f0628c2",
    "id": null,
    "metadata": {},
    "name": "loginQuery",
    "operationKind": "query",
    "text": "query loginQuery(\n  $email: String!\n) {\n  login(email: $email) {\n    name\n    balance\n  }\n}\n"
  }
};
})();

(node as any).hash = "576c4872ccafa29bbef7c1f7d5d34f57";

export default node;
