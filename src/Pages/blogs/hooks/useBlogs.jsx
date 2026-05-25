import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBlogs = () => {
  const {
    data: blogs,
    loading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("https://api.crmpaisa.in/get-blogs-data");
      return res.data;
    },
  });
  return {
    blogs,
    loading,
    error,
  };
};

export default useBlogs;
