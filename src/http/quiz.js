import {api} from "./api";

export default function quizApi() {
    return {
        create: async (data) =>
            api().post('quiz/create', data),
        listQuizes: async () =>
            api().get('quiz/list',),
         singleQuiz: async (id) => 
            api().get(`quiz/${id}`),
        editQuiz: async (id, data) =>
            api().patch(`quiz/${id}`, data),
        deleteUser: async (id) => 
            api().delete(`quiz/${id}`),
        

    }
}