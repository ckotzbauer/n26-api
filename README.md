# N26 API

![build](https://github.com/ckotzbauer/n26-api/workflows/build/badge.svg)
[![NPM](https://img.shields.io/npm/v/n26-api.svg)](https://www.npmjs.com/package/n26-api)

## DEPRECATED: This project is not maintained anymore.

Just another api-client for the [N26](https://n26.com) Bank.


## Installation

```
npm install n26-api
```


## Methods

```js
    authenticate(): Promise<void>;
    getBalance(): Promise<Balance>;
    getInfo(): Promise<PersonalInfo>;
    getStatus(): Promise<Statuses>;
    getAddresses(): Promise<Addresses>;
    getCards(): Promise<Card[]>;
    getLimits(): Promise<Limit[]>;
    getContacts(): Promise<Contact[]>;
    getTransactions(from: Date, to: Date, limit: string): Promise<Transaction[]>;
    getStatements(): Promise<Statement[]>;
    getStatement(id: string): Promise<ReadStream>;
    getSpaces(): Promise<Spaces>;
```

## Example
```js
import { N26 } from "./N26";
import { Balance } from "./contracts/Balance";

const api: N26 = new N26("yourUserName", "yourPassword");
api.authenticate()
    .then(() => api.getBalance())
    .then((balance: Balance) => console.info(balance))
    .catch(console.error);
```


[License](https://github.com/ckotzbauer/n26-api/blob/main/LICENSE)
------
