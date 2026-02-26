import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { copyLibFiles } from "@qwik.dev/partytown/utils";
import path from "path";

// Copy Partytown worker files to public/~partytown on every config initialisation
// (runs at dev start and build time)
copyLibFiles(path.join(process.cwd(), "public", "~partytown")).catch(
  console.error
);

const withNextIntl = createNextIntlPlugin("./src/features/i18n/request.ts");

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default withNextIntl(nextConfig);
