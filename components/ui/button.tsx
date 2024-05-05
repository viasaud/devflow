/* eslint-disable tailwindcss/no-custom-classname */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "no-focus hover:drop-shadow-l h-8 w-full rounded-full bg-gradient-to-r from-teal-600 to-teal-700 text-sm text-white shadow-lg transition-all duration-1000 hover:cursor-pointer hover:shadow-teal-500/50",
        default_small:
          "no-focus mx-auto w-fit rounded-full bg-gradient-to-r from-teal-600 to-teal-700 !px-8 text-sm text-white shadow-lg transition-all duration-1000 hover:cursor-pointer hover:shadow-teal-500/50 hover:drop-shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-primary text-hover hover:border-hover max-h-8 cursor-pointer gap-1 rounded-full border bg-transparent px-4 text-xs",
        secondary: "bg-secondary text-hover-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        ai: "no-focus max-h-7 gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 pl-2 pr-3 text-sm text-white shadow-none hover:from-purple-600 hover:to-violet-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
