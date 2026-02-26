import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Fira_Sans as LogoFont } from "next/font/google";

const logoFont = LogoFont({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function LogoText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-xl font-normal select-none",
        logoFont.className,
        className
      )}
      {...props}
    >
      Insta Saver by Azmra
    </div>
  );
}

export function LogoImage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative w-6 h-6", className)} {...props}>
      <Image
        src="/favicon.ico"
        alt="Instagram Logo"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
      />
    </div>
  );
}
