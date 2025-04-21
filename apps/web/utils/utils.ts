import { formatDistanceToNow } from "date-fns";

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(
    upperAfterLastTwo.length - 4
  )}`;
};

export const formatTimestamp = (timestamp: string) => {
  const distance = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });

  return distance;
};
