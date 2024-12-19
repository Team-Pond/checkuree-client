import { userInfo } from "@/api/AuthApiClient";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data: userInfoData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await userInfo(),
    retry: false,
    select: (response) => response,
  });

  return userInfoData;
};

export default useUser;
