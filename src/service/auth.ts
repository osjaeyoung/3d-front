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
}

export const authService = {
  signup: async (data: SignUpRequest) => {
    const response = await axios.post(
      "http://3.38.72.210:3000/user/signup",
      data
    );
    return response.data;
  },

  signin: async (data: SignInRequest) => {
    const response = await axios.post<SignInResponse>(
      "http://3.38.72.210:3000/user/signin",
      data
    );
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    window.location.href = "/";
  },
};
