// src/components/Animations.tsx
"use client";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";

const animations: Record<string, string> = {
  safari: "/animations/safari.json",
  expeditions: "/animations/mountain.json",
  trekking: "/animations/hiking.json",
  skiing: "/animations/skiing.json",
  "cultural tours": "/animations/culture.json",
  "mountain biking": "/animations/cycle.json",
};

interface AnimationProps {
  type: string;
  onComplete?: () => void;
}

const Animation: React.FC<AnimationProps> = ({ type, onComplete }) => {
  const normalizedType = type.toLowerCase();
  const src = animations[normalizedType] || animations[type];
  const [animationData, setAnimationData] = useState<any>(null);

  if (!src) {
    return <p>Please Wait ! loading data.... "{type}"</p>;
  }

  // 🎨 JSON animation → fetch & use lottie-react
  if (src.endsWith(".json")) {
    useEffect(() => {
      fetch(src)
        .then((res) => res.json())
        .then((data) => setAnimationData(data));
    }, [src]);

    if (!animationData) return <p>Please Wait ! loading data....</p>;

    return (
      <Lottie
        animationData={animationData}
        loop
        autoplay
        onComplete={onComplete}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }

  // 🌀 .lottie files → use DotLottieReact
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop={false}
      style={{ width: "100%", height: "100%" }}
      onEvent={(event) => {
        if (event === "complete" && onComplete) {
          onComplete();
        }
      }}
    />
  );
};

export default Animation;
