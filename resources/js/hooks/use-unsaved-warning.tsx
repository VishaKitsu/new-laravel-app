import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';

export default function useUnsavedWarning(isDirty: boolean) {

  useEffect(() => {

    // Browser close / refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;

      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Inertia navigation
    const removeListener = router.on('before', (event) => {
      if (event.detail?.visit?.prefetch) {
        return;
      }
      
      if (!isDirty) return;

      if (!confirm('You have unsaved changes. Leave page?')) {
        event.preventDefault();
        return;
      }

      // User confirmed → cleanup
      navigator.sendBeacon("/images/delete-leftover");
    });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      removeListener();
    };
  }, [isDirty]);
}
