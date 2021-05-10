import { Session } from "./Session";
import Cookies from "js-cookie";

export interface HeadersAttributes {
    uiid: string;
    csrftoken: string;
}

export default class AppHeaders {

    static buildHeaders() {
        let headerValues = this.getSessionHeaders();

        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-CSRF-TOKEN': `${headerValues.csrftoken}`
        }
    }

    static getSessionHeaders(): HeadersAttributes {
        let headers = {} as HeadersAttributes;
        headers.csrftoken = Cookies.get('CSRF-TOKEN') ?? '';

        return headers;
    }
}

