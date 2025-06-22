import React from "react";
import CardCollection from "./card-collection";
import CommentCard from "./CommentSection/comment-card";

interface Comment {
  avatarUrl: string;
  username: string;
  timeAgo: string;
  text: string;
  tag?: string;
  animeTitle: string;
  animeUrl?: string;
}

interface CommentCollectionProps {
  comments: Comment[];
}

const CommentCollection: React.FC<CommentCollectionProps> = ({ comments }) => {
  return (
    <CardCollection
      title="Останні коментарі"
      items={comments}
      cardType="comment"
    />
  );
};

export default CommentCollection;
