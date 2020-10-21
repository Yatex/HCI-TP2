import { Api } from './api.js';

export { UserApi, Credentials };

class UserApi {
    static get url() {
        return `${Api.baseUrl}/user`;
    }

    static async signup(data, controller) {
        return await Api.post(`${UserApi.url}`, false, data, controller);
    }

    static async signin(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
    }

    static async resendVerifyEmail(data, controller) {
        return await Api.post(`${UserApi.url}/resend_verification`, false, data, controller);
    }

    static async signout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}