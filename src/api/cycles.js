// import Vue from 'vue';
import { Api } from './api.js';

export { CycleApi };

class CycleApi {
    
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    
    static async getAllCycles(routine_id,controller,page,size) {
        return await Api.get(`${CycleApi.url}/${routine_id}/cycles`, true,{page,size}, controller);
    }
   
}

