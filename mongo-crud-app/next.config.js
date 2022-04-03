/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: "mongodb://localhost/taskCrudApp",
  },
};

module.exports = nextConfig;
