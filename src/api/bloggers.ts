import Axios from "axios"

export const getBloggers = async () => {
    const res = await Axios.get<{ id: string, name: string, aq: number }[]>("/bloggers", {
      baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
    });

    return res.data
}