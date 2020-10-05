import Axios from "axios"

export const languageMap = async (): Promise<{ _id: string, key: string, [key: string]: string }[]> => {
    const res = await Axios.get("/text-items", {
      baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
    });

    return res.data
}

export const updateById = async (token: string, id: string, language: string, value: string) => {
  await Axios.put(
    `/text-items/${id}/`,
    {
      [`lng_${language}`]: value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
    }
  );
}