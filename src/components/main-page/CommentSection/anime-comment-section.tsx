import React, { useState, useEffect } from "react";
import AnimeCommentCard from "./anime-comment-card";

interface Comment {
  id: number;
  avatarUrl: string;
  username: string;
  timeAgo: string;
  text: string;
  likes?: number;
  dislikes?: number;
  replies?: Comment[];
}

interface AnimeCommentSectionProps {
  comments: Comment[];
}

const mockUser = {
  avatarUrl: "/assets/mock-user-logo.png",
  username: "Ви",
};

const AnimeCommentSection: React.FC<AnimeCommentSectionProps> = ({
  comments: initialComments,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{
    id: number;
    parentId?: number;
  } | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // async function fetchComments() {
    //   const res = await fetch("/api/comments");
    //   const data = await res.json();
    //   setComments(data);
    // }
    // fetchComments();
  }, []);

  useEffect(() => {
    // if (comments.length) {
    //   fetch("/api/comments", {
    //     method: "POST",
    //     body: JSON.stringify(comments),
    //   });
    // }
  }, [comments]);

  // Додає новий коментар
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        avatarUrl: mockUser.avatarUrl,
        username: mockUser.username,
        timeAgo: "щойно",
        text: newComment,
        likes: 0,
        dislikes: 0,
        replies: [],
      },
    ]);
    setNewComment("");
  };

  // Додає відповідь до коментаря або вкладеної відповіді (2 рівні)
  const handleAddReply = (id: number, parentId?: number) => {
    if (!replyText.trim()) return;
    setComments((prev) => {
      if (parentId) {
        return prev.map((c) =>
          c.id === parentId
            ? {
                ...c,
                replies: (c.replies || []).map((r) =>
                  r.id === id
                    ? {
                        ...r,
                        replies: [
                          ...(r.replies || []),
                          {
                            id: Date.now(),
                            avatarUrl: mockUser.avatarUrl,
                            username: mockUser.username,
                            timeAgo: "щойно",
                            text: replyText,
                            likes: 0,
                            dislikes: 0,
                            replies: [],
                          },
                        ],
                      }
                    : r
                ),
              }
            : c
        );
      }
      // Відповідь на основний коментар
      return prev.map((c) =>
        c.id === id
          ? {
              ...c,
              replies: [
                ...(c.replies || []),
                {
                  id: Date.now(),
                  avatarUrl: mockUser.avatarUrl,
                  username: mockUser.username,
                  timeAgo: "щойно",
                  text: replyText,
                  likes: 0,
                  dislikes: 0,
                  replies: [],
                },
              ],
            }
          : c
      );
    });
    setReplyTo(null);
    setReplyText("");
  };

  const handleLike = (id: number, parentId?: number) => {
    setComments((prev) => {
      if (parentId) {
        return prev.map((c) =>
          c.id === parentId
            ? {
                ...c,
                replies: (c.replies || []).map((r) =>
                  r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r
                ),
              }
            : c
        );
      }
      return prev.map((c) =>
        c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c
      );
    });
  };
  const handleDislike = (id: number, parentId?: number) => {
    setComments((prev) => {
      if (parentId) {
        return prev.map((c) =>
          c.id === parentId
            ? {
                ...c,
                replies: (c.replies || []).map((r) =>
                  r.id === id ? { ...r, dislikes: (r.dislikes || 0) + 1 } : r
                ),
              }
            : c
        );
      }
      return prev.map((c) =>
        c.id === id ? { ...c, dislikes: (c.dislikes || 0) + 1 } : c
      );
    });
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto w-full">
      <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
        Обговорення{" "}
        <span className="text-[#B6B6B6] text-xl">({comments.length})</span>
      </h2>
      <div className="bg-[#18191C] border border-[#23242A] rounded-2xl p-6 mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#23242A] text-white text-xl font-bold">
              +
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#23242A] text-white font-bold">
              B
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#23242A] text-white font-bold">
              i
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#23242A] text-white font-bold">
              🙂
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#23242A] text-white font-bold">
              📎
            </button>
          </div>
          <div className="w-full border-t border-[#888] mb-0" />
          <textarea
            className="bg-[#111113] text-white rounded-2xl border border-[#888] p-5 min-h-[60px] resize-none focus:outline-none focus:border-[#888] mb-2 text-[22px] transition-colors placeholder:text-[#888] w-full"
            placeholder="Напишіть повідомлення..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="px-6 py-2 rounded-lg bg-[#23242A] text-white text-base font-semibold border border-[#44454A] hover:bg-[#33344A] transition"
              onClick={handleAddComment}
            >
              Відправити
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            <AnimeCommentCard
              avatarUrl={comment.avatarUrl}
              username={comment.username}
              timeAgo={comment.timeAgo}
              text={comment.text}
              likes={comment.likes || 0}
              dislikes={comment.dislikes || 0}
              onLike={() => handleLike(comment.id)}
              onDislike={() => handleDislike(comment.id)}
              onReply={() => setReplyTo({ id: comment.id })}
            />
            {/* Відповідь на основний коментар */}
            {replyTo && replyTo.id === comment.id && !replyTo.parentId && (
              <div className="pl-16 mt-2 flex flex-col gap-2">
                <textarea
                  className="bg-[#111113] text-white rounded-2xl border border-[#888] p-4 min-h-[40px] resize-none focus:outline-none focus:border-[#888] text-[18px] transition-colors placeholder:text-[#888] w-full"
                  placeholder="Ваша відповідь..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    className="px-4 py-1 rounded-lg bg-[#23242A] text-white text-base font-semibold border border-[#44454A] hover:bg-[#33344A] transition"
                    onClick={() => handleAddReply(comment.id)}
                  >
                    Відповісти
                  </button>
                  <button
                    className="px-4 py-1 rounded-lg bg-transparent text-[#888] border border-[#44454A] hover:bg-[#23242A] transition"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyText("");
                    }}
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            )}
            {/* Replies (1 рівень) */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-16 mt-2 flex flex-col gap-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id}>
                    <AnimeCommentCard
                      avatarUrl={reply.avatarUrl}
                      username={reply.username}
                      timeAgo={reply.timeAgo}
                      text={reply.text}
                      likes={reply.likes || 0}
                      dislikes={reply.dislikes || 0}
                      isReply
                      onLike={() => handleLike(reply.id, comment.id)}
                      onDislike={() => handleDislike(reply.id, comment.id)}
                      onReply={() =>
                        setReplyTo({ id: reply.id, parentId: comment.id })
                      }
                    />
                    {/* Відповідь на вкладену відповідь (2 рівень) */}
                    {replyTo &&
                      replyTo.id === reply.id &&
                      replyTo.parentId === comment.id && (
                        <div className="pl-12 mt-2 flex flex-col gap-2">
                          <textarea
                            className="bg-[#111113] text-white rounded-2xl border border-[#888] p-4 min-h-[40px] resize-none focus:outline-none focus:border-[#888] text-[18px] transition-colors placeholder:text-[#888] w-full"
                            placeholder="Ваша відповідь..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              className="px-4 py-1 rounded-lg bg-[#23242A] text-white text-base font-semibold border border-[#44454A] hover:bg-[#33344A] transition"
                              onClick={() =>
                                handleAddReply(reply.id, comment.id)
                              }
                            >
                              Відповісти
                            </button>
                            <button
                              className="px-4 py-1 rounded-lg bg-transparent text-[#888] border border-[#44454A] hover:bg-[#23242A] transition"
                              onClick={() => {
                                setReplyTo(null);
                                setReplyText("");
                              }}
                            >
                              Скасувати
                            </button>
                          </div>
                        </div>
                      )}
                    {/* Вкладені відповіді (2 рівень) */}
                    {reply.replies && reply.replies.length > 0 && (
                      <div className="pl-12 mt-2 flex flex-col gap-4">
                        {reply.replies.map((subreply) => (
                          <AnimeCommentCard
                            key={subreply.id}
                            avatarUrl={subreply.avatarUrl}
                            username={subreply.username}
                            timeAgo={subreply.timeAgo}
                            text={subreply.text}
                            likes={subreply.likes || 0}
                            dislikes={subreply.dislikes || 0}
                            isReply
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeCommentSection;
