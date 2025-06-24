import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";
import toast from "react-hot-toast";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const updateProfileMutation = (data, options = {}) => {
    const isProfilePicUpdate = "profilePic" in data;

    return mutate(data, {
      onSuccess: (response) => {
        if (isProfilePicUpdate) {
          toast.success("Profile picture updated successfully");
        } else {
          toast.success("Profile updated successfully");
        }
        options.onSuccess?.(response);
      },
      onError: (error) => {
        const message = isProfilePicUpdate
          ? "Failed to update profile picture"
          : "Failed to update profile";
        toast.error(error.response?.data?.message || message);
        options.onError?.(error);
      },
    });
  };

  return { updateProfileMutation, isUpdating: isPending, error };
};

export default useUpdateProfile;
