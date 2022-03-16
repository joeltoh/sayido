export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  apiGateway: {
    REGION: "us-west-2",
    API_URL: "https://8e1pe3ouya.execute-api.us-west-2.amazonaws.com/prod",
    // API_URL: "https://z9w0000kyi.execute-api.us-west-2.amazonaws.com/prod",
  },
  apiGateway2: {
    REGION: "us-west-2",
    API_URL: "https://z9w0000kyi.execute-api.us-west-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_q9tggZcAQ",
    APP_CLIENT_ID: "nv057r431kl19gtd4hja1i1nv",
    IDENTITY_POOL_ID: "us-west-2:f411e8b7-fd38-40c1-b86d-24de755d5e50"
  }
};