// import Vue from 'vue';
import { Api } from './api.js';

export { UserApi, Credentials };

class UserApi {
    static get isAuthenticated(){
        return Api.token != undefined;
        // return Vue.$cookies.isKey('api-token');
    }

    static get url() {
        return `${Api.baseUrl}/user`;
    }

    static async signup(data, controller) {
        return await Api.post(`${UserApi.url}`, false, data, controller);
    }

    static async signin(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
        // Vue.$cookies.set('api-token', Api.token);
    }

    static async resendVerifyEmail(data, controller) {
        return await Api.post(`${UserApi.url}/resend_verification`, false, data, controller);
    }

    static async signout(controller) {
        // Vue.$cookies.remove('api-token');
        Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
    }
    static async getAllRoutines(controller,page,size) {
        return await Api.get(`${UserApi.url}/current/routines/`, true,{page,size}, controller);
    }
    static async getUser(controller) {
        return await Api.get(`${UserApi.url}/current`, true,null, controller);
    }
    static async modify(user, controller) {
        return await Api.put(`${UserApi.url}/current`, true, user, controller);
    }
     static async delete(controller) {
        return await Api.delete(`${UserApi.url}/current`, true, controller);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}