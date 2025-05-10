'use client';
import { memo, useState, useCallback } from 'react';
import { Button } from './button';
import { KenyanFlagLoader } from './loading-spinner';

export const SignOutDialog = memo(({ 
  trigger, 
  onConfirm, 
  isLoading 
}: {
  trigger: React.ReactNode;
  onConfirm: () => void;
  isLoading?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div onClick={handleOpen} aria-haspopup="dialog">
        {trigger}
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <div 
            className="bg-background rounded-lg border border-border p-6 shadow-lg animate-in fade-in-90 w-[90vw] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Confirm Sign Out</h3>
            <p className="text-muted-foreground mt-2">
              Are you sure you want to sign out?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onConfirm();
                  handleClose();
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <KenyanFlagLoader size="sm" />
                    Signing Out...
                  </div>
                ) : (
                  'Sign Out'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

SignOutDialog.displayName = 'SignOutDialog';