import { useEffect, useState } from "react";
function timeAgo(timestamp) {
  const now = new Date();
  const diff = now - new Date(timestamp);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds > 1 ? `${seconds} seconds ago` : "few seconds ago";
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  if (days < 7) {
    return `${days}d ago`;
  }
  if (weeks < 5) {
    return `${weeks}w ago`;
  }
  if (months < 12) {
    return `${months}m ago`;
  }
  return `${years}y ago`;
}

function CreatedSince({ timestamp }) {
  const [createdSince, setCreatedSince] = useState(() => timeAgo(timestamp));

  useEffect(() => {
    setCreatedSince(() => timeAgo(timestamp));
  }, [timestamp]);

  return <p className="created-since">created {createdSince}</p>;
}
export default CreatedSince;
