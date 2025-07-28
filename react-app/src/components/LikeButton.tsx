import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

interface Props {
  onClick: () => void;
}

function LikeButton({ onClick }: Props) {
  const [isLiked, setLiked] = useState(false);

  const toggle = (status: boolean) => {
    setLiked(status);
    onClick();
  };

  return isLiked ? (
    <FaHeart onClick={() => toggle(false)} />
  ) : (
    <CiHeart onClick={() => toggle(true)} />
  );
}

export default LikeButton;
