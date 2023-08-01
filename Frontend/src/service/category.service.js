import axios from "axios";
import { BASE_API_URL } from "../common/constant";

const API_URL = BASE_API_URL + "/api/categories";

class CategoryService {

    saveCategory(category) {
        return axios.post(API_URL + "/", category);
    }

    deleteCategory(category) {

        return axios.delete(API_URL + "/" + category.id);
    }

    getAllCategory() {
        return axios.get(API_URL + "/");
    }

    updateCategory(category) {
        return axios.put(API_URL + "/", category);
    }

    getCategoryById(id) {
        return axios.get(API_URL + "/" +id);
    }

    searchCategory(ch) {
        return axios.get(API_URL + "/search?ch=" + ch);
    }

}

export default new CategoryService();