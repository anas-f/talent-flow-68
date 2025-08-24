'use client';

import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: 'light' as const,
      label: 'Light',
      icon: Sun,
    },
    {
      name: 'dark' as const,
      label: 'Dark',
      icon: Moon,
    },
    {
      name: 'system' as const,
      label: 'System',
      icon: Monitor,
    },
  ];

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[150px] justify-start">
          <CurrentIcon className="mr-2 h-4 w-4" />
          <span>{currentTheme.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ name, label, icon: Icon }) => (
          <DropdownMenuItem key={name} onClick={() => setTheme(name)}>
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
