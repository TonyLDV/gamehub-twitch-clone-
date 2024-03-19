"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

type ActionsProps = {
  isFollowing: boolean;
  userId: string;
};

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`You are now blocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <>
      <Button disabled={isPending} variant="primary" onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

      <Button variant="destructive" onClick={handleBlock}>
        Block
      </Button>
    </>
  );
};
