import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

export default function FriendsList() {
  const friends = ["Venn1", "Venn2", "Venn3"];
  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <Input placeholder="Legg til venn" className="flex-grow" />
        <Button size="icon" className="ml-2">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>

      <ul className="space-y-6">
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{friend}</span>
            <div className="flex items-center space-x-12">
              <Badge variant="outline">Online</Badge>
              <Button size="sm">Invite</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
