
import { Drawer as DrawerPrimitive } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface ModernDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  side?: "right" | "left";
}

const ModernDrawer = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  side = "right",
}: ModernDrawerProps) => {
  // Determine width based on size
  const getWidth = () => {
    switch (size) {
      case "sm": return "max-w-sm";
      case "md": return "max-w-md";
      case "lg": return "max-w-lg";
      case "xl": return "max-w-xl";
      case "full": return "max-w-full";
      default: return "max-w-md";
    }
  };

  return (
    <DrawerPrimitive
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DrawerPrimitive.Content
          className={cn(
            "fixed z-50 h-full bg-background shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            side === "right" 
              ? "right-0 inset-y-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right border-l" 
              : "left-0 inset-y-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left border-r",
            getWidth()
          )}
        >
          <div className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between mb-5">
              {title && (
                <h2 className="text-lg font-semibold">{title}</h2>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto" 
                onClick={onClose}
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              {children}
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive>
  );
};

export default ModernDrawer;
