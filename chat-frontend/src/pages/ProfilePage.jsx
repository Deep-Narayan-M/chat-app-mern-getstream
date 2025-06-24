import { useState, useEffect } from "react";
import {
  CameraIcon,
  LoaderIcon,
  UserIcon,
  MailIcon,
  ArrowLeftIcon,
  TextIcon,
} from "lucide-react";
import PageLoader from "../components/PageLoader";
import useAuthUser from "../hooks/useAuthUser";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { toast } from "react-hot-toast";
import { Link } from "react-router";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ProfilePage = () => {
  const { authUser, isLoading } = useAuthUser();
  const { updateProfileMutation, isUpdating } = useUpdateProfile();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });

  // Only update form data when authUser changes and is not null
  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username || "",
        email: authUser.email || "",
        bio: authUser.bio || "",
      });
    }
  }, [authUser?._id]); // Only depend on the ID to prevent unnecessary updates

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error(
          `Please upload a valid image file (${ALLOWED_FILE_TYPES.join(", ")})`
        );
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        if (
          typeof base64Image !== "string" ||
          !base64Image.includes("base64")
        ) {
          toast.error("Failed to process image. Please try again.");
          return;
        }

        updateProfileMutation({ profilePic: base64Image });
      };

      reader.onerror = () => {
        toast.error("Failed to read image file. Please try again.");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error in handleImageUpload:", error);
      toast.error("Failed to handle image upload. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.username.trim() === "") {
      return toast.error("Username is required");
    }
    if (formData.email.trim() === "") {
      return toast.error("Email is required");
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return toast.error("Please enter a valid email address");
    }

    // Only update if values have changed
    const updates = {};
    if (formData.username !== authUser.username) {
      updates.username = formData.username;
    }
    if (formData.email !== authUser.email) {
      updates.email = formData.email;
    }
    if (formData.bio !== authUser.bio) {
      updates.bio = formData.bio;
    }

    // Only make API call if there are changes
    if (Object.keys(updates).length > 0) {
      updateProfileMutation(updates);
    } else {
      toast.info("No changes to update");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading || !authUser) return <PageLoader />;

  return (
    <div className="h-screen">
      <div className="max-w-2xl mx-auto py-4 relative">
        <Link to="/" className="absolute left-2 top-6 btn btn-ghost btn-circle">
          <ArrowLeftIcon className="size-6" />
        </Link>

        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-base-content/70">
              Your profile information
            </p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="size-32 rounded-full bg-base-200 overflow-hidden border-4 border-base-100">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt={authUser.username}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdating ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <CameraIcon className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  onChange={handleImageUpload}
                  disabled={isUpdating}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdating
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <UserIcon className="size-4" />
                Your Name
              </div>
              <input
                name="username"
                className="block w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <MailIcon className="size-4" />
                Email Address
              </div>
              <input
                name="email"
                type="email"
                className="block w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <TextIcon className="size-4" />
                Bio
              </div>
              <textarea
                name="bio"
                className="block w-full px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 min-h-[100px] resize-y"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                maxLength={200}
              />
              <div className="text-xs text-base-content/50 text-right">
                {formData.bio.length}/200 characters
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="btn btn-primary w-full"
            >
              {isUpdating ? (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Updating Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>

          {/* Account Information */}
          <div className="mt-6 bg-base-200 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span>Member Since</span>
                <span>{new Date(authUser.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
