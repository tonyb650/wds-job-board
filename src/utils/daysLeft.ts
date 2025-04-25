function daysLeft(date: Date): string {
  const now = new Date();
  const timeDifference = date.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (daysLeft > 0) {
    return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
  } else {
    return "Expired";
  }
}

export default daysLeft