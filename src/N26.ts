
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ParsedUrlQueryInput, stringify } from "querystring";
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

export class N26 {

    private static apiUrl: string = "https://api.tech26.de";
    private static clientId: string = "android";
    private static clientSecret: string = "secret";

    private currentToken: Token;

    constructor(private userName: string, private password: string) {
    }

    public async authenticate(): Promise<void> {
        const data: ParsedUrlQueryInput = {
            grant_type: "password",
            username: this.userName,
            password: this.password
        };

        const cred: string = Buffer.from(`${N26.clientId}:${N26.clientSecret}`).toString("base64");
        const headers: Record<string, string> = { "Authorization": `Basic ${cred}`, "Content-type": "application/x-www-form-urlencoded" };

        const response: AxiosResponse<Token> = await axios.post<string, AxiosResponse<Token>>(`${N26.apiUrl}/oauth/token`, stringify(data), { headers });
        this.currentToken = { access_token: response.data.access_token, refresh_token: response.data.refresh_token };
    }

    private async get<T>(url: string, params?: ParsedUrlQueryInput, opts?: AxiosRequestConfig): Promise<T> {
        const response = await axios.get(`${N26.apiUrl}${url}?${stringify(params)}`, { 
            headers: { "Authorization": `Bearer ${this.currentToken.access_token}` },
            ...opts 
        });
        return response.data as T;
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
        const params: ParsedUrlQueryInput = {
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
