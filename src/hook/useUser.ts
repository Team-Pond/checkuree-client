import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

export const useUser = () => {
  const { data: user } = useQuery<User>({
    queryKey: ["user"],
  });
  return user;
};
