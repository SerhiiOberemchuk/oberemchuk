"use client";

import {Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCookieConsent} from "@/hooks/use-cookie-consent";

type CookieSettingsButtonProps = {
  label: string;
};

export default function CookieSettingsButton({label}: CookieSettingsButtonProps) {
  const {openSettings} = useCookieConsent();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={openSettings}
      className="h-auto justify-start px-0 text-sm font-normal text-gray-600 hover:bg-transparent hover:text-green-600 focus-visible:text-green-700"
    >
      <Settings className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
