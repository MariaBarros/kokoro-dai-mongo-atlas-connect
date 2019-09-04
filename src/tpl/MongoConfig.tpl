let environments = {};

// Staging (default) environment
environments.staging = {
  'envName' : 'staging',
  'connection' : "$stagingConn"  
};

// Production environment
environments.production = {  
  'envName' : 'production',  
  'connection': "$prodConn"
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export config
module.exports = environmentToExport;