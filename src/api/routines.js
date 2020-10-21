import { Api } from './api.js';

export { RoutineApi,/* Routine*/ };

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
    return await Api.delete(`${RoutineApi.url}/${id}`, true, controller);
  }

  static async get(id, controller) {
    return await Api.get(`${RoutineApi.url}/${id}`,true,  controller);
  }

  static async getAll(controller,difficulty,page) {
    return await Api.get(RoutineApi.url+"?difficulty="+difficulty+"&page="+page+"&size=8&orderBy=dateCreated&direction=asc", true, controller);
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
}

class Routines {
    constructor(totalCount,orderBy) {

        this.totalCount=totalCount;
        this.orderBy=orderBy;
        this.direction;
        this.results= [];
        this.size;
        this.page;
        this.isLastPage;
    }
}*/