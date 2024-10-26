import axios from "axios";

interface SignUpRequest {
  name: string;
  userId: string;
  pwd: string;
  email: string;
}

interface SignInRequest {
  userId: string;
  pwd: string;
}

interface SignInResponse {
  accessToken: string;
  name: string;
  email: string;
}

export const authService = {
  signup: async (data: SignUpRequest) => {
    const response = await axios.post("/proxy/user/signup", data);
    return response.data;
  },

  signin: async (data: SignInRequest) => {
    const response = await axios.post<SignInResponse>(
      "/proxy/user/signin",
      data
    );
    const { accessToken, name, email } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    window.location.href = "/";
  },
};
