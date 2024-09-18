"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { FaUser } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";

export default function UserInfo() {
  const user = useCurrentUser();
  console.log(user?.image);
  return (
    <div className="flex flex-col items-center space-y-6">
      {user?.image ? (
        <Avatar className="h-96 w-96 ">
          <AvatarImage src={user?.image || ""} alt="profile-picture" />
          <AvatarFallback>
            <FaUser />
          </AvatarFallback>
        </Avatar>
      ) : (
        <FaUser size={96} />
      )}
      <Input placeholder="Username" />
      <Textarea placeholder="Status eller biografi" />
    </div>
  );
}
