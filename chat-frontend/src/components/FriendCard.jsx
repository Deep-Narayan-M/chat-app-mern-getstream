import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 rounded-full">
            <img
              className="rounded-full"
              src={friend.profilePic}
              alt={friend.username}
            />
          </div>
          <h3 className="font-semibold truncate">{friend.username}</h3>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          <MessageCircleMore className="size-4 mr-2" />
          Chat
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
