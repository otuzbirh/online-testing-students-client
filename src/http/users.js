import {api} from "./api";

export default function usersApi() {
    return {
        create: async (data) =>
            api().post('user/create', data),
        listUsers: async () =>
            api().get('user/list',),
        singleUser: async (id) => 
            api().get(`user/${id}`),
        editUser: async (id, data) =>
            api().patch(`user/${id}`, data),
        deleteUser: async (id) => 
            api().delete(`user/${id}`),
        listStudents: async () => 
            api().get('user/')

    }
}