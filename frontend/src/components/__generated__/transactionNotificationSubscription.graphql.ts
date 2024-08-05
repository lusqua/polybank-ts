/**
 * @generated SignedSource<<b21064e201a9c5ae219fa48662ec2d1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type transactionNotificationSubscription$variables = {
  email: string;
};
export type transactionNotificationSubscription$data = {
  readonly transactionReceived: {
    readonly amount: number;
    readonly message: string;
    readonly sender: string;
  } | null | undefined;
};
export type transactionNotificationSubscription = {
  response: transactionNotificationSubscription$data;
  variables: transactionNotificationSubscription$variables;
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
    "concreteType": "TrnsactionReceived",
    "kind": "LinkedField",
    "name": "transactionReceived",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
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
        "name": "sender",
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
    "name": "transactionNotificationSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "transactionNotificationSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "45ff2e5921279982c8d3a85c8ea33f74",
    "id": null,
    "metadata": {},
    "name": "transactionNotificationSubscription",
    "operationKind": "subscription",
    "text": "subscription transactionNotificationSubscription(\n  $email: String!\n) {\n  transactionReceived(email: $email) {\n    message\n    amount\n    sender\n  }\n}\n"
  }
};
})();

(node as any).hash = "8d7344964c70d13d2ff789cc9dc2cb49";

export default node;
