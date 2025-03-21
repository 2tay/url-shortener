"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlFormData, urlSchema } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { shortenUrl } from "@/server/actions/urls/shorten-url";
import { Card, CardContent } from "../ui/card";
import { AlertTriangle, Copy, QrCode } from "lucide-react";
import { useSession } from "next-auth/react";
import { QRCodeModal } from "../modals/qr-code-modal";
import { boolean } from "drizzle-orm/gel-core";
import { toast } from "sonner";
import { SignupSuggestionDialog } from "../dialogs/signup-suggestion-dialog";

export function UrlShortenerForm() {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [flaggedInfo, setFlaggedInfo] = useState<{
    flagged: boolean;
    reason: string | null;
    message: string | undefined;
  } | null>(null);

  // Set origin safely after component mounts
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
      customCode: "",
    },
  });

  const onSubmit = async (data: UrlFormData) => {
    setIsLoading(true);
    setError(null);
    setShortUrl(null);
    setShortCode(null);
    setFlaggedInfo(null);

    try {
      const formData = new FormData();
      formData.append("url", data.url);

      // If a custom code is provided, append it to the form data
      if (data.customCode && data.customCode.trim() !== "") {
        formData.append("customCode", data.customCode.trim());
      }

      const response = await shortenUrl(formData);
      if (response.success && response.data) {
        setShortUrl(response.data.shortUrl);
        // Extract the short code from the short URL
        const shortCodeMatch = response.data.shortUrl.match(/\/r\/([^/]+)$/);
        if (shortCodeMatch && shortCodeMatch[1]) {
          setShortCode(shortCodeMatch[1]);
        }

        if (response.data.flagged) {
          setFlaggedInfo({
            flagged: response.data.flagged,
            reason: response.data.flagReason || null,
            message: response.data.message,
          });

          toast.warning(response.data.message || "This URL is flagged", {
            description: response.data.flagReason,
          });
        } else {
          toast.success("URL shortened successfully");
        }
      }

      if (session?.user && pathname.includes("/dashboard")) {
        router.refresh();
      }

      if (!session?.user) {
        setShowSignupDialog(true);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const showQrCode = () => {
    if (!shortUrl || !shortCode) return;
    setIsQrCodeModalOpen(true);
  };

  return (
    <>
      <div className="max-w-screen max-h-screen mx-auto border border-gray-200 rounded-md shadow-sm p-6 bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Paste your long URL here"
                        {...field}
                        disabled={isLoading}
                        className="border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md px-4 py-2 bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Shortening...
                  </>
                ) : (
                  "Shorten"
                )}
              </Button>
            </div>

            <FormField
              control={form.control}
              name="customCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-2 border border-gray-300 rounded-l-md">
                        {process.env.NEXT_PUBLIC_APP_URL || origin}/r/
                      </span>
                      <Input
                        placeholder="Custom code (optional)"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value || "")}
                        disabled={isLoading}
                        className="flex-1 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-r-md px-4 py-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            {shortUrl && (
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Your shortened URL:
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="font-medium border-gray-300 bg-gray-50"
                    />
                    <Button
                      type="button"
                      variant={"outline"}
                      className="flex-shrink-0 border-gray-300 hover:bg-gray-50 text-gray-700"
                      onClick={copyToClipboard}
                    >
                      <Copy className="size-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      type="button"
                      variant={"outline"}
                      className="flex-shrink-0 border-gray-300 hover:bg-gray-50 text-gray-700"
                      onClick={showQrCode}
                    >
                      <QrCode className="size-4" />
                    </Button>
                  </div>

                  {flaggedInfo && flaggedInfo.flagged && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">
                            This URL has been flagged for review
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            {flaggedInfo.message ||
                              "This URL will be reviewed by an administrator before it becomes fully active."}
                          </p>
                          {flaggedInfo.reason && (
                            <p className="text-sm mt-2 text-yellow-600">
                              <span className="font-medium">Reason:</span>{" "}
                              {flaggedInfo.reason || "Unknown reason"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>

      <SignupSuggestionDialog
        isOpen={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        shortUrl={shortUrl || ""}
      />

      {shortUrl && shortCode && (
        <QRCodeModal
          isOpen={isQrCodeModalOpen}
          onOpenChange={setIsQrCodeModalOpen}
          url={shortUrl}
          shortCode={shortCode}
        />
      )}
    </>
  );
}