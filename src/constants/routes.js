export default {
  spel: {
    root: "/spel/v1",
    auth: {
      signin: "/in",
      signup: "/join",
      social_auth: "/auth",
      verify: "/email-verify/:token",
      password_reset: "/password-reset/:token",
      password_reset_email_endpoint: "/password-reset/email"
    },
    profile: {
      get: "/user/:username",
      update: "/profile",
      create: "/profile",
      all: "/users",
      by_email: "/user/:email"
    }
  }
};
