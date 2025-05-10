import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "@/lib/supabase/users"; // Import the backend functions

// Fetch User Profile
export const useUserProfile = (userId?: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const data = await getUserProfile(userId);
      return data;
    },
    enabled: !!userId, // only run if userId is available
  });
};

// Update User Profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { userId: string; updates: Partial<any> }) => {
      const data = await updateUserProfile(payload.userId, payload.updates);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', variables.userId], data); // Update cache with new user data
    },
  });
};
