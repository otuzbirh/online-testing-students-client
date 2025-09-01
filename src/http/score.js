import {api} from "./api";

export default function scoreApi() {
    return {
        create: async (data) =>
            api().post('score/create', data),
        listScores: async () =>
            api().get('score/list',),
        studentScores: async (id) => 
            api().get(`score/list/${id}`),
        deleteScore: async (id) => 
            api().delete(`score/delete/${id}`)
   
        

    }
}