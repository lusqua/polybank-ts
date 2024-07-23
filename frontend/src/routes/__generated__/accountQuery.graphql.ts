/**
 * @generated SignedSource<<2ee8101f61784d075747bfba8cc5f7aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type accountQuery$variables = {
  id: string;
};
export type accountQuery$data = {
  readonly account: {
    readonly _id: string;
    readonly balance: number;
    readonly name: string;
  } | null | undefined;
  readonly accountTransactions: ReadonlyArray<{
    readonly _id: string;
    readonly amount: number;
    readonly createdAt: string;
    readonly receiver: {
      readonly _id: string;
      readonly name: string;
    };
    readonly sender: {
      readonly _id: string;
      readonly name: string;
    };
  } | null | undefined> | null | undefined;
};
export type accountQuery = {
  response: accountQuery$data;
  variables: accountQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accountId",
        "variableName": "id"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "accountTransactions",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "sender",
        "plural": false,
        "selections": (v3/*: any*/),
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
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "receiver",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "account",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
    "name": "accountQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "accountQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "817c5dd3006a0d24516ab1d240029be7",
    "id": null,
    "metadata": {},
    "name": "accountQuery",
    "operationKind": "query",
    "text": "query accountQuery(\n  $id: String!\n) {\n  accountTransactions(accountId: $id) {\n    _id\n    sender {\n      _id\n      name\n    }\n    amount\n    createdAt\n    receiver {\n      _id\n      name\n    }\n  }\n  account(id: $id) {\n    _id\n    name\n    balance\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee0577433ce2fbbc59c8bc26c06777f1";

export default node;
