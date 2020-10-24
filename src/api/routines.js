import { Api } from './api.js';

export { RoutineApi,/*Routines, Routine */};

class RoutineApi {
  static get url() {
    return `${Api.baseUrl}/routines`;
  }

  static async add(routine, controller) {
    // console.log(RoutineApi.url);
    // console.log(JSON.stringify(routine));
    return await Api.post(RoutineApi.url, true, routine, controller);
  }

  static async modify(routine, controller) {
    return await Api.put(`${RoutineApi.url}/${routine.id}`, true, routine, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(`${RoutineApi.url}/${id}`, true, controller);
  }

  static async getAll(page, size, controller) {
    return await Api.get(RoutineApi.url, true, {page,size}, controller);
  }

  static async get(id, controller) {
    return await Api.get(`${RoutineApi.url}/${id}`,true,  controller);
  }

  // ---------------------------------- Cycles ----------------------------------

  static async getCycles(routineId, controller) {
    let res = await Api.get(`${RoutineApi.url}/${routineId}/cycles`
      +`?page=0&size=50`,true,  controller);
    return res.results;
  }

  static async addCycle(routineId, cycle, controller) {
    // console.log(`${RoutineApi.url}/${routineId}/cycles`);
    // console.log(JSON.stringify(cycle));
    return await Api.post(`${RoutineApi.url}/${routineId}/cycles`, true, cycle, controller);
  }

  static async updateCycle(routineId, cycleId, data, controller) {
    return await Api.put(`${RoutineApi.url}/${routineId}/cycles/${cycleId}`,
      true, data, controller);
  }

  static async deleteCycle(routineId, cycleId, controller) {
    return await Api.delete(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/`,
      true, controller);
  }

  // ---------------------------------- Exercises ----------------------------------

  static async getExercises(routineId, cycleId, controller) {
    let res = await Api.get(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises`
      +`?page=0&size=50`,true,  controller);
    return res.results;
  }

  static async addExercise(routineId, cycleId, exercise, controller) {
    // console.log(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises`);
    // console.log(JSON.stringify(exercise));
    return await Api.post(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises`, true, exercise, controller);
  }

  static async updateExercise(routineId, cycleId, exerciseId, data, controller) {
      return await Api.put(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}`,
        true, data, controller);
  }
  
  static async deleteExercise(routineId, cycleId, exerciseId, controller) {
    return await Api.delete(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}`,
      true, controller);
  }
  // ---------------------------------- IMAGES ----------------------------------
  static async createImage(routineId, cycleId, exerciseId,{number,imgUrl} ,controller) {
    return await Api.post(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images`,
      true,{number,imgUrl} ,controller);
  }
  static async getImage(routineId, cycleId, exerciseId,controller) {
    return await Api.get(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images`,
      true ,controller);
  }
  static async putImage(routineId, cycleId, exerciseId,imageId,{number,url},controller) {
    return await Api.put(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images/${imageId}`,
      true,{number,url} ,controller);
  }
  static async deleteImage(routineId, cycleId, exerciseId,imageId, controller) {
    return await Api.delete(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/images/${imageId}`,
      true, controller);
  }
   // ---------------------------------- VIDEO ----------------------------------
  static async createVideo(routineId, cycleId, exerciseId,{number,imgUrl} ,controller) {
    return await Api.post(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/video`,
      true,{number,imgUrl} ,controller);
  }
  static async getVideo(routineId, cycleId, exerciseId ,controller) {
    return await Api.get(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos`,
      true ,controller);
  }
  static async putVideo(routineId, cycleId, exerciseId,videoId,{number,url},controller) {
    return await Api.put(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos/${videoId}`,
      true,{number,url} ,controller);
  }
  static async deleteVideo(routineId, cycleId, exerciseId,videoId, controller) {
    return await Api.delete(`${RoutineApi.url}/${routineId}/cycles/${cycleId}/exercises/${exerciseId}/videos/${videoId}`,
      true, controller);
  }

}

