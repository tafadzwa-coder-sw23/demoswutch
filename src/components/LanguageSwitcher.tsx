import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/i18n/i18n";

const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();
  return (
    <Select value={lang} onValueChange={(v) => setLang(v as any)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="sn">Shona</SelectItem>
        <SelectItem value="nd">Ndebele</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;


