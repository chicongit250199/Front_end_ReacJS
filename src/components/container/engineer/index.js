import {getDataByIdApi, getAllApi, putApi, postApi, delApi } from "../../../api/crud";


class EngineerContainer {
    add(data) {
        return postApi('engineers', data)
    }
    delete(id) {
        return delApi('engineers', id)
    }
    update(id, data){
        return putApi('engineers', id, data)
    }
    getPagination(data) {
        return getAllApi('auth/view', data)
    }

    getById(id){
        return getDataByIdApi('engineers', id)
    }
}
export default new EngineerContainer()