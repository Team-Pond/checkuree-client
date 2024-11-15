import { useQuery } from "@tanstack/react-query";
import { userInfo } from "../../api/AttendanceApiClient";

const useUser = () => {
  const { data: userInfoData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await userInfo(),
    retry: false,
    select: (response) => response.data,
  });

  return userInfoData;
};

export default useUser;
