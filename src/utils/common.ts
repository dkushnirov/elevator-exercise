export const generateRandomKey = (): string => {
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);
  const randomKey = Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return randomKey;
};
