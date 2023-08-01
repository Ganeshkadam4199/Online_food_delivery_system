import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/food";

class FoodService {
    saveFood(food) {
        return axios.post(API_URL + "/save", food);
    }
    getAllFood() {
        return axios.get(API_URL + "/");
    }

    getFoodById(id) {
        return axios.get(API_URL + "/foodById/" + id);
    }

    updateFOod(food) {
        return axios.post(API_URL + "/updateFood", food);
    }

    deleteFood(id) {
        return axios.get(API_URL + "/deleteFood/" + id);
    }

    countDetails() {
        return axios.get(API_URL + "/count");
    }

    getAllUser() {
        return axios.get(API_URL + "/getUser");
    }

    updateProfile(user) {
        return axios.post(API_URL + "/updateProfile", user, { headers: AuthHeader() });
    }

    searchFood(ch) {
        return axios.get(API_URL + "/search?ch=" + ch);
    }

    getFoodByCategory(id) {
        return axios.get(API_URL + "/getFoodByCategory/" + id);
    }

    searchFoodByCategory(ch,cat)
    {
        return axios.get(API_URL+"/searchFoodByCategory?ch="+ch+"&&cat="+cat);
    }


}

export default new FoodService();