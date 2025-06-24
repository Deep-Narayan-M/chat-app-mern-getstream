import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    error,
    authUser: data?.user
      ? {
          ...data.user,
          _id: data.user._id.toString(), // Ensure ID is a string
        }
      : null,
  };
};

export default useAuthUser;
