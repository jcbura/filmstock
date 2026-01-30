export const ACCEPT_MIME = ['image/png', 'image/jpg', 'image/jpeg'] as const;

export const isSupportedMime = (file: File) =>
  (ACCEPT_MIME as readonly string[]).includes(file.type);
