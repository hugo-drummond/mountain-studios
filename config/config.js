/** @type {AgencyConfig} */
const config = {
  agency: {
    name: "Mountain Studios",
    email: "hello@mountainstudios.co.za",
    phone: "",
    timezone: "Africa/Johannesburg",
  },
  pricing: {
    basePriceGBP: 499,
    pricePerPageGBP: 99,
    pricePerExtraSectionGBP: 29,
    customPagePriceGBP: 79,
    depositPercentage: 50,
    baseSectionsIncluded: 3,
  },
  meetings: {
    discoveryDurationMins: 30,
    briefReviewDurationMins: 30,
    progressReviewDurationMins: 30,
    bufferMins: 15,
  },
  ads: {
    autoPauseCTRThreshold: 0.008,
    autoScaleCostPerLeadGBP: 12,
    autoScaleBudgetIncrement: 0.20,
    minImpressionsBeforeJudge: 1000,
  },
  notifications: {
    webhookUrl: "PLACEHOLDER_NOTIFICATION_WEBHOOK",
  },
}

module.exports = config
