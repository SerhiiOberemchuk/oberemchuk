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
      className="h-auto justify-start px-0 text-sm font-normal text-[hsl(var(--muted-foreground))] hover:bg-transparent hover:text-[hsl(var(--primary))] focus-visible:text-[hsl(var(--foreground))]"
    >
      <Settings className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
