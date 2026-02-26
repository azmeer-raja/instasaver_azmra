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
    <div className={cn("relative flex items-center justify-center", className)} {...props}>
      <Image
        src="/logo-42.png"
        alt="Insta Saver Logo"
        width={42}
        height={42}
        priority
        className="object-contain"
      />
    </div>
  );
}


