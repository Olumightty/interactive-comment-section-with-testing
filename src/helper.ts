export function timeAgo(timestamp: number): string {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
    const intervals: { [key: string]: number } = {
      year: 31536000, // 365 days
      month: 2592000, // 30 days
      week: 604800, // 7 days
      day: 86400, // 24 hours
      hour: 3600, // 60 minutes
      minute: 60,
      second: 1,
    };
  
    for (const [unit, seconds] of Object.entries(intervals)) {
      const count = Math.floor(diffInSeconds / seconds);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }
  
    return "Just now";
  }
  