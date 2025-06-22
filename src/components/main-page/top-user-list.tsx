import React from "react";
import CardCollection from "./card-collection";

interface TopUser {
  rank: number;
  avatarUrl: string;
  username: string;
  registration: string;
  stars: string;
  comments: string;
  folders: string;
}

interface TopUserListProps {
  users: TopUser[];
}

const TopUserList: React.FC<TopUserListProps> = ({ users }) => {
  return (
    <div className="flex flex-col gap-0">
      <CardCollection
        title="Топ користувачі"
        items={users}
        cardType="top-user"
      />
    </div>
  );
};

export default TopUserList;
