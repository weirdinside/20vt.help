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

export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function greetingTime() {
  const now = new Date().getHours();
  if (now >= 0 && now < 12) return "good morning";
  if (now >= 12 && now <= 15) return "good afternoon";
  if (now > 15 && now <= 23) return "good evening";
}

export async function copyLink(link: string) {
  try {
    await navigator.clipboard.writeText(link);
    return "success";
  } catch (err) {
    return err;
  }
}
