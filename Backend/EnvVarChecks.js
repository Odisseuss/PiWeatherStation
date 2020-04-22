require("dotenv").config();

function EnvVarChecks() {
  const pg_env_var_names = ["HOST", "USER", "DATABASE", "PASSWORD", "PORT"];
  const app_env_var_names = ["PORT"];

  // Check if every env var required for the database was set
  pg_env_var_names.forEach((var_name) => {
    if (eval(`process.env.PG_${var_name}`) === undefined) {
      throw new Error(
        `Database ${var_name} environment variable has not been set. Please provide a value and try again.`
      );
    }
  });

  // Check if every env var required for the server was set
  app_env_var_names.forEach((var_name) => {
    if (eval(`process.env.APP_${var_name}`) === undefined) {
      throw new Error(
        `App ${var_name} environment variable has not been set. Please provide a value and try again.`
      );
    }
  });
}

module.exports = EnvVarChecks;
