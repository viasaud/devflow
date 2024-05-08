import EditProfileButton from "./edit-profile-button";
import ProfileInfo from "./profile-info";
import ProfileMedals from "./profile-medals";

interface Props {
  user: {
    reputation: number;
    avatar: string;
    name: string;
    username: string;
    bio: string;
    joinedAt: Date;
    location: string;
  };
  totalQuestions: number;
  totalAnswers: number;
}

const ProfileCard = async ({
  user,
  isUserProfile,
}: {
  user: Props;
  isUserProfile: boolean;
}) => {
  return (
    <div className="border-primary my-4 rounded-md border p-5">
      <div className="flex-center flex-col gap-3.5">
        <ProfileInfo user={user} />

        <ProfileMedals reputation={user.user.reputation} />

        <EditProfileButton isUserProfile={isUserProfile} />
      </div>
    </div>
  );
};

export default ProfileCard;
