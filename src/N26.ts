
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import { Balance } from "./contracts/Balance";
import { Token } from "./contracts/Token";
import { PersonalInfo } from "./contracts/PersonalInfo";
import { Statuses } from "./contracts/Statuses";
import { Addresses } from "./contracts/Addresses";
import { Card } from "./contracts/Card";
import { Limit } from "./contracts/Limit";
import { Contact } from "./contracts/Contact";
import { Transaction } from "./contracts/Transaction";
import { Statement } from "./contracts/Statement";
import { Spaces } from "./contracts/Spaces";
import { ReadStream } from "fs";
import { setServers, lookup } from "dns";
import { promisify } from "util";
import { N26Options } from "./N26Options";

export class N26 {

    private static apiHost: string = "api.tech26.de";
    private static clientId: string = "android";
    private static clientSecret: string = "secret";

    private currentToken: Token;
    private apiUrlPromise: Promise<string>;
    private apiUrl: string;

    private options: N26Options;

    constructor(private userName: string, private password: string, private opts?: N26Options) {
        this.options = { useIp: false, dnsServers: ["8.8.8.8", "8.8.4.4"], ...opts };

        if (this.options.useIp) {
            setServers(this.options.dnsServers);
            this.apiUrlPromise = this.resolveApiUrl();
        } else {
            this.apiUrlPromise = Promise.resolve(`https://${N26.apiHost}`);
        }
    }

    public async authenticate(): Promise<void> {
        const data: object = {
            grant_type: "password",
            username: this.userName,
            password: this.password
        };

        const callUrl: string = await this.apiUrlPromise;
        const cred: string = Buffer.from(`${N26.clientId}:${N26.clientSecret}`).toString("base64");
        const headers: object = { 
            "Authorization": `Basic ${cred}`, 
            "Content-type": "application/x-www-form-urlencoded",
            "Host": N26.apiHost
        };

        const response: AxiosResponse = await axios.post(`${callUrl}/oauth/token`, stringify(data), { headers });
        this.currentToken = { accessToken: response.data.access_token, refreshToken: response.data.refresh_token };
    }

    private async resolveApiUrl(): Promise<string> {
        const { address } = await promisify(lookup)(N26.apiHost, { family: 4 });
        return `https://${address}`;
    }

    private async get<T>(url: string, params?: object, opts?: AxiosRequestConfig): Promise<T> {
        const callUrl: string = await this.apiUrlPromise;
        const response = await axios.get(`${callUrl}${url}?${stringify(params)}`, { 
            headers: { 
                "Authorization": `Bearer ${this.currentToken.accessToken}`,
                "Host": N26.apiHost
            }, 
            ...opts 
        });
        return response.data;
    }

    public async getBalance(): Promise<Balance> {
        return await this.get("/api/accounts");
    }

    public async getInfo(): Promise<PersonalInfo> {
        return await this.get("/api/me");
    }

    public async getStatus(): Promise<Statuses> {
        return await this.get("/api/me/statuses");
    }

    public async getAddresses(): Promise<Addresses> {
        return await this.get("/api/addresses");
    }

    public async getCards(): Promise<Card[]> {
        return await this.get("/api/v2/cards");
    }

    public async getLimits(): Promise<Limit[]> {
        return await this.get("/api/settings/account/limits");
    }

    public async getContacts(): Promise<Contact[]> {
        return await this.get("/api/smrt/contacts");
    }

    public async getTransactions(from: Date, to: Date, limit: string): Promise<Transaction[]> {
        const params: object = {
            limit: limit,
            from: from.getTime().toString(),
            to: to.getTime().toString()
        };

        return await this.get("/api/smrt/transactions", params);
    }

    public async getStatements(): Promise<Statement[]> {
        return await this.get("/api/statements");
    }

    public async getStatement(id: string): Promise<ReadStream> {
        return await this.get(`/api/statements/${id}`, undefined, { responseType: "stream" });
    }

    public async getSpaces(): Promise<Spaces> {
        return await this.get("/api/spaces");
    }
}
