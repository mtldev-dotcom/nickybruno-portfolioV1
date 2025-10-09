"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

export interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const nextIsDark = !isDark;

    const applyTheme = () => {
      flushSync(() => {
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle("dark", nextIsDark);
        try {
          localStorage.setItem("theme", nextIsDark ? "dark" : "light");
        } catch {
          // ignore storage errors (e.g., privacy mode)
        }
      });
    };

    const anyDoc = document as unknown as {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (anyDoc.startViewTransition) {
      await anyDoc.startViewTransition(applyTheme).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          // Only applies when View Transitions API is available
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } else {
      // Fallback without View Transitions API
      applyTheme();
    }
  }, [isDark, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
