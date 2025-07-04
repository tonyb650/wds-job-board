export type PublishedStatus = "unpublished" | "expired" | "active";

const publishedStatus = (expiresAt: Date | undefined | null): PublishedStatus => {
  if (!expiresAt) {
    return "unpublished";
  } else if (expiresAt && expiresAt >= new Date()) { // Kyle uses 'date-fns' for this
    return "active";
  } else {
    return "expired";
  }
};

export default publishedStatus;
