import axios from "../../../utils/axios.config"
export const fetchUsers = async() => {
    const data = await axios.get("/users");
    // console.log(data)
    return data.data;
}

export const postUser = async(userData) => {
    await axios.post("/users", userData);
}
export const deleteUser = async(id) => {
    await axios.delete(`/users/${id}`);
}