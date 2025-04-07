import React from "react";
import Image from "next/image";

type BackgroundImageProps = {
  src: string;
  alt: string;
  className?: string;
  overlay?: "gradient" | "dark" | "none";
  children?: React.ReactNode;
};

export function BackgroundImage({
  src,
  alt,
  className = "",
  overlay = "none",
}: BackgroundImageProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      {overlay === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
      )}
      {overlay === "dark" && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}
    </div>
  );
}