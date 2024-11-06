export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export const debounce = (func, wait: number) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function greetingTime() {
  const now = new Date().getHours();
  if (now >= 0 && now < 12) return "good morning";
  if (now >= 12 && now <= 15) return "good afternoon";
  if (now > 15 && now <= 23) return "good evening";
}
