import { useQuery } from "@tanstack/react-query";
import AuthApiClient from "../../api/auth/AuthApiClient";

const useUser = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await AuthApiClient.getInstance().userInfo(),
    retry: false,
    select: (response) => response.data,
  });

  return userInfo;
};

export default useUser;
