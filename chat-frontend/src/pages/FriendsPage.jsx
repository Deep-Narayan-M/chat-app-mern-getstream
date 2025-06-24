import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  MessageCircleIcon,
  MessageCircleMore,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import NoFriendsYet from "../components/NoFriendsYet.jsx";

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="container mx-auto">
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsYet />
        ) : (
          <div className="flex flex-col gap-4">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-row card-body p-4 justify-between">
                  {/* USER INFO */}
                  <div className="flex items-center gap-3">
                    <div className="avatar size-12 rounded-full">
                      <img
                        className="rounded-full"
                        src={friend.profilePic}
                        alt={friend.username}
                      />
                    </div>
                    <div className="flex flex-col ml-2">
                      <h3 className="font-semibold truncate">
                        {friend.username}
                      </h3>

                      {/* Bio */}
                      <p className="text-sm text-base-content/70">
                        {friend.bio}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/chat/${friend._id}`}
                    className="btn btn-outline rounded-full w-[calc(50%)] flex items-center gap-2 hover:bg-primary hover:text-primary-content"
                  >
                    <MessageCircleMore className="size-4" />
                    Chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
