import { JOB_LISTING_DURATIONS } from "../constants/schemas"

export function getJobListingPriceInCents(
  duration: (typeof JOB_LISTING_DURATIONS)[number]
) {
  switch (duration) {
    case 30:
      return 10000
    case 60:
      return 17500
    case 90:
      return 22500
    default:
      throw new Error("Didn't expect to get here")
  }
}

