export default {
  spel: {
    root: "/spel/v1",
    auth: {
      signin: "/in",
      signup: "/join",
      social_auth: "/auth",
      verify: "/email-verify/:token"
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
