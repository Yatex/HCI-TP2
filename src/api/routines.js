import { Api } from './api.js';

export { RoutineApi,/*Routines, Routine */};

class RoutineApi {
  static get url() {
    return `${Api.baseUrl}/routines`;
  }

  static async add(routine, controller) {
    return await Api.post(RoutineApi.url, true, routine, controller);
  }

  static async modify(routine, controller) {
    return await Api.put(`${RoutineApi.url}/${routine.id}`, true, routine, controller);
  }

  static async delete(id, controller) {
    let cycles = await RoutineApi.getCycles(id);

    for (let i=0; i < cycles.length; i++) {
      console.log("Deleting a cycle");
      await RoutineApi.deleteCycle(id, cycles[i].id);
    }

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
    return await Api.post(`${RoutineApi.url}/${routineId}/cycles`, true, cycle, controller);
  }

  static async updateCycle(routineId, cycleId, data, controller) {
    return await Api.put(`${RoutineApi.url}/${routineId}/cycles/${cycleId}`,
      true, data, controller);
  }

  static async deleteCycle(routineId, cycleId, controller) {
    let exercises = await RoutineApi.getExercises(routineId,cycleId);
    
    for (let i=0; i < exercises.length; i++) {
      console.log("Deleting an exercise");
      await RoutineApi.deleteExercise(routineId, cycleId, exercises[i].id);
    }

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

  // ---------------------------------- Ratings ---------------------------------

  static async getRatings(routineId, controller) {
    return await Api.get(`${RoutineApi.url}/${routineId}/ratings`, routineId, controller);
  }

  static async rateRoutine(routineId, body, controller) {
    return await Api.post(`${RoutineApi.url}/${routineId}/ratings`, routineId, body, controller);
  }
}

/*
class Routine {
    constructor(id, name, detail,dateCreated,averageRating,isPublic,difficulty,creator,category) {
        // if (id) {
        this.id = id;
        // }
        this.name = name;
        this.detail = detail;
        this.dateCreated=dateCreated;
        this.averageRating=averageRating;
        this.isPublic=isPublic;
        this.difficulty=difficulty
        this.creator=creator;
        this.category=category;
    }
}*/

// class Routines {
//     constructor(totalCount,orderBy) {

//         this.totalCount=totalCount;
//         this.orderBy=orderBy;
//         this.direction;
//         this.results= [];
//         this.size;
//         this.page;
//         this.isLastPage;
//     }
// }