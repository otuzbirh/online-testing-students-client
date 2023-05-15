import {api} from "./api";

export default function usersApi() {
    return {
        create: async (data) =>
            api().post('user/create', data),
        listUsers: async (id) =>
            api().get('user/list',),
        // updateTask: async (data: ITask, id: string | undefined) => 
        //     getApiClient().put(`tasks/${id}`, data),
        // updateTask2: async (data: ITask2, id: string | undefined) => 
        //     getApiClient().put(`tasks/${id}`, data)

    }
}