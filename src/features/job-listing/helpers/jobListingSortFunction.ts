import { JobListing } from "../constants/types"

export default function jobListingSortFunction (a: JobListing, b: JobListing) {
  if (a.expiresAt == null && b.expiresAt == null) {
    return 0
  }
  if (a.expiresAt == null) {        // Drafts should show up first
    return -1
  }
  if (b.expiresAt == null) {
    return 1
  }
  return a.expiresAt.getTime() - b.expiresAt.getTime()
}