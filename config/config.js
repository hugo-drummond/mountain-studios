/** @type {AgencyConfig} */
const config = {
  agency: {
    name: "Mountain Studios",
    email: "hello@mountainstudios.co.za",
    phone: "",
    timezone: "Africa/Johannesburg",
  },
  // Pricing is quoted per job, not computed. The old GBP price list
  // (base + per-page + per-section) has been removed along with the FX engine —
  // Mountain Studios sells in South Africa only, and every project is priced on
  // its own merits. depositPercentage is the one rule that survives: it splits
  // whatever rand amount an admin enters when sending a brief.
  pricing: {
    depositPercentage: 50,
    // Reps negotiate the price with the client and earn 20% of it, so the floor
    // is what stops a deal being discounted below the point where it is worth
    // building. Enforced server-side in admin/leads/[id]/send-brief.
    floorPriceZAR: 800,
  },
  meetings: {
    discoveryDurationMins: 30,
    briefReviewDurationMins: 30,
    progressReviewDurationMins: 30,
    bufferMins: 15,
  },
  ads: {
    autoPauseCTRThreshold: 0.008,
    // Converted from £12 at ~R23/£. Confirm the real rand target.
    autoScaleCostPerLeadZAR: 276,
    autoScaleBudgetIncrement: 0.20,
    minImpressionsBeforeJudge: 1000,
  },
  notifications: {
    webhookUrl: "PLACEHOLDER_NOTIFICATION_WEBHOOK",
  },
}

module.exports = config
