"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { MinusCircle, Moon, Power, Sun } from "lucide-react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200"
    {...props}
    ref={ref}
  >
    <div className="relative h-5 w-5">
      <SwitchPrimitives.Thumb
        className="pointer-events-none absolute block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      >
        <div className="absolute inset-0 flex items-center justify-center text-xs">
          {props.checked ? (
            <Power size={12} className="text-green-600" />
          ) : (
            <MinusCircle size={12} className="text-gray-600" />
          )}
        </div>
      </SwitchPrimitives.Thumb>
    </div>
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch };