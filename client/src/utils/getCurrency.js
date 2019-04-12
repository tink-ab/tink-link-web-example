export const getCurrency = data =>
  data ? data.response.userData.profile.currency : "";
