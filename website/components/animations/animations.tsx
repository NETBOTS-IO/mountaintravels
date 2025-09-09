// src/components/Animations.tsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react"; // ✅ for JSON animations

const animations: Record<string, string> = {
  safari: "/animations/safari.json",
  expeditions: "/animations/mountain.json",
  trekking: "/animations/hiking.json",
  skiing: "/animations/skiing.json",
  "cultural tours": "/animations/culture.json",
  "mountain biking": "/animations/cycle.json", // ✅ JSON animation
};

interface AnimationProps {
  type: string;
  onComplete?: () => void;
}

const Animation: React.FC<AnimationProps> = ({ type, onComplete }) => {
  const normalizedType = type.toLowerCase();
  const src = animations[normalizedType] || animations[type];

  if (!src) {
    return <p>No animation available for "{type}"</p>;
  }

  // 🎨 if it's a JSON file, fetch it and pass to Lottie
  if (src.endsWith(".json")) {
    return (
      <Lottie
        path={src} // ✅ directly load JSON from /public
        loop
        autoplay
      />
    );
  }

  // 🌀 fallback for .lottie files
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop={false}
      onComplete={onComplete}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Animation;
