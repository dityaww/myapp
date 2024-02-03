import axios from "axios";
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;
// const apiUrl = Constants.extra.API_URL;


export const getDataPost = async () => {
  const data = await axios.get(`${apiUrl}/post/allpost`);
  // console.log(data.data);
  return data.data;
};

// Filter Kategori
export const filterbyCategory = async (query) => {
  const response = await axios.get(
    `${apiUrl}/post/category/${query}`
  );
  return response.data;
};

// Search user by keyword
export const searchUserData = async (query) => {
  const response = await axios.get(
    `${apiUrl}/user/search?keyword=${query}`
  );
  return response.data;
};

// Detail User
export const getDetailUser = async (id) => {
  const response = await axios.get(
    `${apiUrl}/user/userprofile/${id}`
  );
  return response.data;
};

export const dummyApi = async () => {
  const response = await axios.get(`https://6353ff98ccce2f8c02010974.mockapi.io/api/web-basic/v1/Users`)
  return response.data.data
}
