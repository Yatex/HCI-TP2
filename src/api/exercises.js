// import Vue from 'vue';
import { Api } from './api.js';

export { ExerciseApi };

class ExerciseApi {
    
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    
    static async getAllExercises(routine_id,cycle_id,controller,page,size) {
        return await Api.get(`${ExerciseApi.url}/${routine_id}/cycles/${cycle_id}/exercises`, true,{page,size}, controller);
    }
   
}

