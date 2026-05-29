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
      const res = await axios.get("https://api.crmpaisa.com/get-blogs-data");
      return res.data;
    },
  });

  //Only display blogs who are published (wb_publish_status = 1)
  const filteredBlogs =
    blogs && blogs?.data?.length > 0
      ? blogs?.data.filter((blog) => +blog.wb_publish_status === 1)
      : [];

  console.log("Filtered Blogs:", filteredBlogs);

  return {
    blogs: filteredBlogs,
    loading,
    error,
  };
};

export default useBlogs;
