/**
 * @generated SignedSource<<7e56e3c33ef586bc9b2f48c29e78bf82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateTransactionInput = {
  amount: number;
  receiver: string;
  sender: string;
};
export type transferDrawerMutation$variables = {
  input: CreateTransactionInput;
};
export type transferDrawerMutation$data = {
  readonly CreateTransaction: {
    readonly error: string | null | undefined;
    readonly success: boolean;
    readonly transaction: {
      readonly _id: string;
      readonly amount: number;
      readonly receiver: {
        readonly name: string;
      };
      readonly sender: {
        readonly name: string;
      };
    } | null | undefined;
  } | null | undefined;
};
export type transferDrawerMutation = {
  response: transferDrawerMutation$data;
  variables: transferDrawerMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TransactionPayloadResponse",
    "kind": "LinkedField",
    "name": "CreateTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "transaction",
        "plural": false,
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
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": (v1/*: any*/),
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
            "name": "receiver",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          }
        ],
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
    "name": "transferDrawerMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "transferDrawerMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "10929b16de725f9a70c1c87bbd9b76a9",
    "id": null,
    "metadata": {},
    "name": "transferDrawerMutation",
    "operationKind": "mutation",
    "text": "mutation transferDrawerMutation(\n  $input: CreateTransactionInput!\n) {\n  CreateTransaction(input: $input) {\n    success\n    error\n    transaction {\n      _id\n      sender {\n        name\n      }\n      amount\n      receiver {\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0c126f764330f2d30600f5827c5a774a";

export default node;
