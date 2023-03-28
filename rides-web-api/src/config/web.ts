/**
 * Web Configuration
 * (app.config.web)
 *
 * Pattern for common Web servers
 *
 * @see {@link http://fabrix.app/docs/config/web}
 */
const {jwtSecret} = require('../api/constants')

export const web = {
  /**
   * The host to bind the web server to
   */
  host: process.env.HOST || '0.0.0.0',

  port: process.env.PORT || 8000,
  options: {
    routes: {
      cors: true  
    },
    /**
     * The port to bind the web server to
     */
    port: process.env.PORT || 8000,
  },
  plugins: [
    {
      plugin: require('hapi-auth-jwt2'),
      options: {}
    },
    {
      plugin: require('hapi-pagination'),
      options: {
        routes: {
            include: [],  // Emptying include list will disable pagination
        }
      }
    }, 
    {
      plugin: require('inert'),
      options: {}
    }
  ],
  onPluginsLoaded: function () {
    const hapiServer = this.spools.hapi.server
   hapiServer.auth.strategy('jwt', 'jwt', {
      key: jwtSecret,
     validate: validateAuthToken,
      urlKey: false,
      cookieKey: false,
      verifyOptions: {
        onPluginsLoadedalgorithms: ['HS256']
      } // pick a strong algorithm
   })
   
   hapiServer.auth.default('jwt')
  }
}

const validateAuthToken = async (decoded, request) => {
    return {isValid: true}
}

