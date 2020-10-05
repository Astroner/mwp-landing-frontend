import Axios from "axios";

export const signin = async (email: string, password: string) => {
    const res = await Axios.post<{ jwt: string }>(
      "/auth/local",
      {
        identifier: email,
        password,
      },
      {
        baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
      }
    );
    return res.data
}
  