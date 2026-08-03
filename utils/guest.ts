import { v4 as uuidv4 } from 'uuid';

/**
 * Retrieves the existing persistent guest ID or generates a new one
 * and saves it to localStorage.
 */
export const getOrGenerateGuestId = (): string => {
  // 1. Check if we are in the browser
  if (typeof window === 'undefined') {
    return 'temp-server-id'; // Fallback for Server-Side Rendering
  }

  // 2. Try to get existing ID
  let guestId = localStorage.getItem('guest_id');

  // 3. If not found, generate new, save, and return
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('guest_id', guestId);
  }

  return guestId;
};