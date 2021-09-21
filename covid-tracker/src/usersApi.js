import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class UsersApi {

  static token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTExODc5MX0.AqT7KiMVLRYg6JXdsP84ELB6P9XaOzvhR7xpgvUy2zo';
  
  /* method for making axios requests to our server  */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${UsersApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  /* Get all users from user route */
  static async getAllUsers() {
      let res = await this.request(`users`);
      return res.users;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async register(data){
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async updateUser(data, username){
    let res = await this.request(`users/${username}`, data, "patch")
    return res.user;
  }
  

}

export default UsersApi;