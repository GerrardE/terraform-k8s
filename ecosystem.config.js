module.exports = {
  apps : [{
    name: "server",
    script: "./build/index.js",
    watch: ".",
    env: {
      NODE_ENV: "production",
      PORT: 3000
   },
  }],
};
