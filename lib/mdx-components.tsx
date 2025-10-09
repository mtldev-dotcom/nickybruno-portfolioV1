import Link from "next/link";

import { cn } from "@/lib/utils";

type MDXComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
};

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "scroll-mt-28 text-3xl font-semibold tracking-tight text-balance md:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "scroll-mt-28 text-2xl font-semibold tracking-tight text-balance md:text-3xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "scroll-mt-28 text-xl font-semibold tracking-tight text-pretty md:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("text-base leading-7 text-muted-foreground text-pretty", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc space-y-2 text-muted-foreground", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal space-y-2 text-muted-foreground", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn("leading-7 text-pretty", className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary/60 pl-6 italic text-foreground/80 text-pretty md:text-lg",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <Link
      className={cn(
        "font-medium text-foreground underline underline-offset-4 transition hover:text-primary",
        className,
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-2 py-1 font-mono text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre className={cn("my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm", className)} {...props} />
  ),
};
