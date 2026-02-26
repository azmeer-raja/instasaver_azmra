import React from "react";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("layouts.home.footer");

  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-gray-100 py-8 md:py-8 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">{t("legal")}</h3>
            <div className="flex flex-col gap-2">
              <a
                href="/privacy"
                className="text-muted-foreground text-sm hover:text-purple-600"
              >
                {t("links.privacy")}
              </a>
              <a
                href="/terms"
                className="text-muted-foreground text-sm hover:text-purple-600"
              >
                {t("links.terms")}
              </a>
              <a
                href="/dmca"
                className="text-muted-foreground text-sm hover:text-purple-600"
              >
                {t("links.dmca")}
              </a>
              <a
                href="/disclaimer"
                className="text-muted-foreground text-sm hover:text-purple-600"
              >
                {t("links.disclaimer")}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">Support</h3>
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-purple-600"
            >
              {t("links.contact")}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
          <p className="text-muted-foreground text-sm text-center">
            {t("copyright", { year })}
          </p>
          <p className="text-muted-foreground text-sm text-center">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
