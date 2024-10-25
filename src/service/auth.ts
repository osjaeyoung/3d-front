import axios from "axios";

interface SignUpRequest {
  name: string;
  userId: string;
  pwd: string;
  email: string;
}

interface SignInRequest {
  userId: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

export const authService = {
  signup: async (data: SignUpRequest) => {
    const hashedPassword = await axios.post<{ hashedPassword: string }>(
      "/api/hash",
      { password: data.pwd }
    );

    const encryptedData = {
      ...data,
      pwd: hashedPassword.data.hashedPassword,
    };

    const response = await axios.post(
      "http://3.38.72.210:3000/user/signup",
      encryptedData
    );
    return response.data;
  },

  signin: async (data: SignInRequest) => {
    const hashedPassword = await axios.post<{ hashedPassword: string }>(
      "/api/hash",
      { password: data.password }
    );

    const encryptedData = {
      userId: data.userId,
      pwd: hashedPassword.data.hashedPassword,
    };

    const response = await axios.post<SignInResponse>(
      "http://3.38.72.210:3000/user/signin",
      encryptedData
    );
    return response.data;
  },
};
