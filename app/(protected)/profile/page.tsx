import CardWrapper from "@/features/profile/components/card-wrapper-profile";
import UserInfo from "@/features/profile/components/user-info";
import FriendsList from "@/features/profile/components/friends-list";
import StatsAchievements from "@/features/profile/components/stats-achievements";

export default function ProfilePage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardWrapper headerLabel="Profile Info">
          <UserInfo />
        </CardWrapper>
        <CardWrapper headerLabel="Friends List">
          <FriendsList />
        </CardWrapper>
        <div>
          <CardWrapper headerLabel="Stats & Achievements">
            <StatsAchievements />
          </CardWrapper>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <div className="bg-red-500 w-1/3 h-32"></div>
        <div className="bg-red-100 w-1/3 h-32"></div>
        <div className="bg-red-900 w-1/3 h-32"></div>
      </div>
    </div>
  );
}
