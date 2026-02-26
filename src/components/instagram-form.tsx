"use client";

import React, { useState } from "react";
import Image from "next/image";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader2, X, Search, Heart, MessageSquare, Eye, Play } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn, getPostShortcode, isShortcodePresent } from "@/lib/utils";
import { useGetInstagramPostMutation } from "@/features/react-query/mutations/instagram";
import { HTTP_CODE_ENUM } from "@/features/api/http-codes";

// 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

const useFormSchema = () => {
  const t = useTranslations("components.instagramForm.inputs");

  return z.object({
    url: z
      .string({ required_error: t("url.validation.required") })
      .trim()
      .min(1, {
        message: t("url.validation.required"),
      })
      .startsWith("https://www.instagram.com", t("url.validation.invalid"))
      .refine(
        (value) => {
          return isShortcodePresent(value);
        },
        { message: t("url.validation.invalid") }
      ),
  });
};

function triggerDownload(videoUrl: string) {
  // Ensure we are in a browser environment
  if (typeof window === "undefined") return;

  const randomTime = new Date().getTime().toString().slice(-8);
  const filename = `gram-grabberz-${randomTime}.mp4`;

  // Construct the URL to your proxy API route
  const proxyUrl = new URL("/api/download-proxy", window.location.origin); // Use relative path + origin
  proxyUrl.searchParams.append("url", videoUrl);
  proxyUrl.searchParams.append("filename", filename);

  console.log("Using proxy URL:", proxyUrl.toString()); // For debugging

  const link = document.createElement("a");
  // Set href to your proxy route
  link.href = proxyUrl.toString();
  link.target = "_blank";

  // The 'download' attribute here is less critical because the proxy
  // sets the Content-Disposition header, but it can still be helpful
  // as a fallback or hint for the browser. Keep the desired filename.
  link.setAttribute("download", filename);

  // Append link to the body temporarily
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up and remove the link
  document.body.removeChild(link);
}

type CachedUrl = {
  videoUrl?: string;
  metadata?: any;
  expiresAt: number;
  invalid?: {
    messageKey: string;
  };
};

function formatCompactNumber(number: number | undefined | null): string {
  if (number === undefined || number === null) return "—";
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

export function InstagramForm(props: { className?: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cachedUrls = React.useRef(new Map<string, CachedUrl>());

  const t = useTranslations("components.instagramForm");

  const {
    isError,
    isPending,
    mutateAsync: getInstagramPost,
  } = useGetInstagramPostMutation();

  const formSchema = useFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const errorMessage = form.formState.errors.url?.message;

  const isDisabled = isPending || !form.formState.isDirty;
  const isShowClearButton = form.watch("url").length > 0;

  const [metadata, setMetadata] = useState<any>(null);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [resolution, setResolution] = useState("1080p");

  function clearUrlField() {
    form.setValue("url", "");
    form.clearErrors("url");
    inputRef.current?.focus();
    setMetadata(null);
  }

  function setCachedUrl(
    shortcode: string,
    videoUrl?: string,
    metadata?: any,
    invalid?: CachedUrl["invalid"]
  ) {
    cachedUrls.current?.set(shortcode, {
      videoUrl,
      metadata,
      expiresAt: Date.now() + CACHE_TIME,
      invalid,
    });
  }

  function getCachedUrl(shortcode: string) {
    const cachedUrl = cachedUrls.current?.get(shortcode);

    if (!cachedUrl) {
      return null;
    }

    if (cachedUrl.expiresAt < Date.now()) {
      cachedUrls.current.delete(shortcode);
      return null;
    }

    return cachedUrl;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isError) {
      toast.dismiss("toast-error");
    }

    const shortcode = getPostShortcode(values.url);

    if (!shortcode) {
      form.setError("url", { message: t("inputs.url.validation.invalid") });
      return;
    }

    const cachedUrl = getCachedUrl(shortcode);
    if (cachedUrl?.invalid) {
      form.setError("url", { message: t(cachedUrl.invalid.messageKey) });
      return;
    }

    if (cachedUrl?.metadata) {
      setMetadata(cachedUrl.metadata);
      return;
    }

    try {
      setIsLoadingMeta(true);
      const { data, status } = await getInstagramPost({ shortcode });

      if (status === HTTP_CODE_ENUM.OK) {
        const media = data.data.xdt_shortcode_media;
        const videoUrl = media.video_url;
        if (videoUrl) {
          setCachedUrl(shortcode, videoUrl, media);
          setMetadata(media);
          toast.success(t("toasts.success"), {
            id: "toast-success",
            position: "top-center",
            duration: 1500,
          });
        } else {
          throw new Error("Video URL not found");
        }
      } else if (
        status === HTTP_CODE_ENUM.NOT_FOUND ||
        status === HTTP_CODE_ENUM.BAD_REQUEST ||
        status === HTTP_CODE_ENUM.TOO_MANY_REQUESTS ||
        status === HTTP_CODE_ENUM.INTERNAL_SERVER_ERROR
      ) {
        const errorMessageKey = `serverErrors.${data.error}`;
        form.setError("url", { message: t(errorMessageKey) });
        if (
          status === HTTP_CODE_ENUM.BAD_REQUEST ||
          status === HTTP_CODE_ENUM.NOT_FOUND
        ) {
          setCachedUrl(shortcode, undefined, undefined, {
            messageKey: errorMessageKey,
          });
        }
      } else {
        throw new Error("Failed to fetch video");
      }
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.error"), {
        dismissible: true,
        id: "toast-error",
        position: "top-center",
      });
    } finally {
      setIsLoadingMeta(false);
    }
  }

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={cn("w-full space-y-2", props.className)}>
      {errorMessage ? (
        <p className="h-4 text-sm text-red-500 sm:text-start">{errorMessage}</p>
      ) : (
        <div className="h-4"></div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 sm:flex-row sm:items-end"
        >
          <FormField
            control={form.control}
            name="url"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">
                  {t("inputs.url.label")}
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      type="url"
                      ref={inputRef}
                      minLength={1}
                      maxLength={255}
                      placeholder={t("inputs.url.placeholder")}
                    />
                    {isShowClearButton && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={clearUrlField}
                        className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="text-red-500" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isDisabled || isLoadingMeta}
            type="submit"
            className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700"
          >
            {isPending || isLoadingMeta ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search
          </Button>
        </form>
      </Form>
      <p className="text-muted-foreground text-center text-xs">{t("hint")}</p>

      {/* Metadata display */}
      {metadata && (
        <div className="mt-8 w-full max-w-3xl mx-auto bg-white/70 dark:bg-black/50 backdrop-blur-xl rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-white/20 dark:border-white/10 text-foreground">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Thumbnail & Download Button */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Media Preview Thumbnail */}
              {(metadata.thumbnail_src || metadata.display_url || metadata.thumbnail_url) && (
                <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 group">
                  <Image
                    src={`/api/image-proxy?url=${encodeURIComponent(metadata.thumbnail_src || metadata.display_url || metadata.thumbnail_url)}`}
                    alt="Thumbnail"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {metadata.is_video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg">
                        <Play className="h-8 w-8 ml-1 fill-white" />
                      </div>
                    </div>
                  )}
                  {/* Caption Overlay */}
                  {metadata.edge_media_to_caption?.edges?.[0]?.node?.text && (
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium line-clamp-1">
                        {metadata.edge_media_to_caption.edges[0].node.text}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Caption Under Thumbnail (Fallback/Extra) */}
              {metadata.edge_media_to_caption?.edges?.[0]?.node?.text && (
                <p className="text-center text-sm text-muted-foreground line-clamp-1 mt-2">
                  <span className="font-medium text-foreground">Caption:</span> {metadata.edge_media_to_caption.edges[0].node.text}
                </p>
              )}

              {/* Download Button */}
              <div className="w-full mt-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (metadata.video_url) triggerDownload(metadata.video_url);
                  }}
                  className="w-full rounded-full h-12 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all uppercase tracking-wide border-0"
                  style={{ backgroundImage: "linear-gradient(to right, #a855f7, #ec4899)" }}
                >
                  DOWNLOAD VIDEO
                </Button>
                {/* Resolution Select (Only if available) */}
                {metadata.video_versions && metadata.video_versions.length > 0 && (
                  <div className="mt-3 flex justify-center">
                    <Select value={resolution} onValueChange={setResolution}>
                      <SelectTrigger className="w-full max-w-[200px] h-9 rounded-full bg-white/50 dark:bg-black/50 border-white/20 dark:border-white/10 text-xs">
                        <SelectValue placeholder="Resolution: 1080p" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">1080p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="2K">2K</SelectItem>
                        <SelectItem value="4K">4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Info & Metrics */}
            <div className="flex-1 flex flex-col items-center md:items-start gap-6">

              {/* Creator Info */}
              <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-4 bg-white/40 dark:bg-black/30 p-3 rounded-2xl w-full text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {metadata.owner?.profile_pic_url ? (
                    <Image
                      src={`/api/image-proxy?url=${encodeURIComponent(metadata.owner.profile_pic_url)}`}
                      alt={metadata.owner.username}
                      width={48}
                      height={48}
                      unoptimized
                      className="rounded-full ring-2 ring-white dark:ring-black/50 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800" />
                  )}
                  <div className="flex flex-col items-center md:items-start">
                    <p className="font-semibold text-base flex items-center gap-1.5">
                      @{metadata.owner?.username}
                      {metadata.owner?.is_verified && <span className="text-green-500 text-lg leading-none">✅</span>}
                    </p>
                    {metadata.owner?.edge_followed_by?.count !== undefined && (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {formatCompactNumber(metadata.owner.edge_followed_by.count)} followers
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Creator Metrics Section */}
              <div className="flex flex-col items-center w-full gap-3">
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-sm font-medium shadow-sm">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    {formatCompactNumber(metadata.edge_media_preview_like?.count)}
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-sm font-medium shadow-sm">
                    <MessageSquare className="w-4 h-4 text-slate-400 fill-slate-400" />
                    {formatCompactNumber(metadata.edge_media_to_parent_comment?.count ?? metadata.edge_media_to_comment?.count ?? metadata.comment_count)}
                  </div>
                  <div className="flex justify-center items-center gap-1.5 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-sm font-medium shadow-sm w-full sm:w-auto mt-1 sm:mt-0">
                    <Eye className="w-4 h-4 text-slate-400" />
                    {formatCompactNumber(metadata.video_play_count ?? metadata.video_view_count ?? metadata.view_count)} Views
                  </div>
                </div>
              </div>

              {/* Technical Details Section */}
              <div className="flex flex-col items-center w-full gap-3 pt-2">
                <div className="flex flex-col items-center gap-2">
                  {metadata.video_duration && (
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-sm shadow-sm w-fit">
                      <span className="text-muted-foreground mr-1.5">Duration:</span> {Math.round(metadata.video_duration / 60 * 10) / 10} mins
                    </div>
                  )}
                  {metadata.clips_music_attribution_info && (
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-sm shadow-sm w-fit max-w-full text-center">
                      <span className="text-muted-foreground mr-1.5 shrink-0">Audio:</span>
                      <span className="truncate">{metadata.clips_music_attribution_info.song_name}</span>
                    </div>
                  )}
                  {!metadata.clips_music_attribution_info && (
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-sm shadow-sm w-fit">
                      <span className="text-muted-foreground mr-1.5">Audio:</span> Original Audio
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
