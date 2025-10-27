// ecosystem.config.js
module.exports = {
  apps: [{
    name: "electro-montage",
    script: "node_modules/next/dist/bin/next",
    args: "start -p 3000",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    watch: false,
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "1G",
    error_file: "logs/error.log",
    out_file: "logs/out.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss"
  }]
}