import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
  });

function errorHandler(error) {
if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
}
throw error;
}
  
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    service,

    getUser() {
        return service
          .get("/api")
          .then((res) => res.data)
          .catch(errorHandler);
      },

    editUser(userId, userUpdate) {
        return service
        .patch(`/api/update/${userId}`, userUpdate)
        .then((res) => res.data)
        .catch(errorHandler);
    },

    addPokemon (userId, pokemonName) {
        return service
          .patch(`/api/add/${userId}`, pokemonName)
          .then((res) => res.data)
          .catch(errorHandler);
      },

    removePokemon(userId, pokemonName) {
    return service
        .patch(`/api/remove/${userId}`, pokemonName)
        .then((res) => res.data)
        .catch(errorHandler);
    },

};
