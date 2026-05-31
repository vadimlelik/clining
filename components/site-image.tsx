"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/site-images";

type Props = Omit<ImageProps, "src" | "onError"> & {
  src: string;
};

/** next/image с подстановкой запасного URL при ошибке загрузки */
export function SiteImage({ src, alt, ...props }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== FALLBACK_IMAGE) setCurrentSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
