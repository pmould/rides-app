/**
 * Routes Configuration
 *
 * Configure how url patterns map to controllers, views, and static files.
 *
 * @see {@link http://fabrix.app/docs/config/routes}
 */

export const routes = {
  '': {
    'GET': {
      'handler': 'ViewController.helloWorld',
      'config': {
        'auth': false
      }
    }
  },
  'accounts': {
    'POST': {
      'handler': 'AccountController.saveNewAccount'
    }
  },
  'accounts/{accountId}': {
    'PUT': {
      'handler': 'AccountController.updateAccount'
    }
  },
  'api/v1/default/info': {
    'GET': {
      'handler': 'DefaultController.info'
    }
  },
  'ghLocationSearchTaxonomy': {
    'GET': {
      'handler': 'GhLocationSearchTaxonomyController.get',
        'config': {
        'auth': false
      }
    }
  },  
  'listings': {
    'GET': {
      'handler': 'ListingController.getAll'
    },
    'POST': {
      'handler': 'ListingController.create'
    }
  },
  'listings/{listingId}': {
    'POST': {
      'handler': 'ListingController.update'
    },
    'GET': {
      'handler': 'ListingController.getById',
        'config': {
        'auth': false
      }
    }
  },
  'listings/{listingId}/photos/{listingPhotoId}': {
    'DELETE': {
      'handler': 'ListingController.deletePhoto'
    }
  },
  'listings/{listingId}/publish': {
    'POST': {
      'handler': 'ListingController.publish'
    }
  },
  'listings/photo': {
    'POST': {
      'handler': 'ListingController.savePhoto',
        'config': {
        'payload': {
          'output': 'stream',
            'parse': true,
              'maxBytes': 4000000
        }
      }
    }
  },
  'reservations/host': {
    'GET': {
      handler: 'ReservationController.getAllHost',
      config: {
        plugins: {
            pagination: {
                enabled: true
            }
        }
      }
    }
  },
  'reservations/driver': {
    'GET': {
      handler: 'ReservationController.getAllDriver',
      config: {
        plugins: {
            pagination: {
                enabled: true
            }
        }
      }
    }
  },
  'reservation/{reservationId}/tripPhotos': {
    'POST': {
      'handler': 'ReservationController.saveTripPhoto',
        'config': {
        'payload': {
          'output': 'stream',
            'parse': true,
              'maxBytes': 4000000
        }
      }
    }
  },
  'reservations/messages/{profileType}': {
    'GET': {
      handler: 'ReservationController.getMessages',
      config: {
        plugins: {
            pagination: {
                enabled: true
            }
        }
      }
    }
  },
  'reservations': {
    'POST': {
      handler: 'ReservationController.create'
    },
  },
  'reservations/{reservationId}': {
    'GET': {
      handler: 'ReservationController.getById'
    },   
    'PATCH': {
      handler: 'ReservationController.patch'
    }
  },
  // 'profile/picture': {
  //   'POST': {
  //     'handler': 'ProfileController.savePhoto',
  //       'config': {
  //       'payload': {
  //         'output': 'file',
  //           'parse': true,
  //             'maxBytes': 4000000
  //       }
  //     }
  //   }
  // },
  'newVehicleStaticData': {
    'GET': {
      'handler': 'NewVehicleStaticDataController.getData'
    }
  },
  'searchListings': {
    'GET': {
      'handler': 'SearchListingsController.getSearchListings',
        'config': {
          'auth': {
            strategy: 'jwt',
            mode: 'optional'
          }
      }
    }
  },
  'socialAuth/{provider}': {
    'POST': {
      'handler': 'SocialAuthenticationController.authenticateUser',
        'config': {
        'auth': false
      }
    }
  },
  'login': {
    'POST': {
      'handler': 'UserAccountController.login',
        'config': {
        'auth': false
      }
    }
  },
  'auth/reauthorizeLogin': {
    'GET': {
      'handler': 'UserAccountController.reauthorizeLogin'
    }
  },
  'signUp': {
    'POST': {
      'handler': 'UserAccountController.signUp',
        'config': {
        'auth': false
      }
    }
  },
  'activateUserAccount': {
    'GET': {
      'handler': 'UserAccountController.activatAccount',
      'config': {
        'auth': false
      }
    }
  },
  'webNotificationActivation': {
    'PUT': {
      'handler': 'UserController.registerWebNotifiction'
    }
  },
  'webNotificationDeavtivation': {
    'PUT': {
      'handler': 'UserController.unregisterWebNotifiction'
    }
  },
  'auth/updatePassword': {
    'POST': {
      'handler': 'UserAccountController.updatePassword',
        'config': {
          'auth': {
            'mode': 'optional'
          }
      }
    }
  },
  'auth/passwordReset': {
    'GET': {
      'handler': 'UserAccountController.verifyPasswordReset',
        'config': {
        'auth': false
      }
    }
  },
  'sendResetPasswordEmail': {
    'POST': {
      'handler': 'UserAccountController.sendResetPasswordEmail',
        'config': {
        'auth': false
      }
    }
  },
  'userAccount': {
    'GET': {
      'handler': 'UserController.get'
    }
  },
  'profiles/{userId}/profilePicture': {
    'POST': {
      'handler': 'UserController.saveProfilePicture',
        'config': {
        'payload': {
          'output': 'stream',
            'parse': true,
              'maxBytes': 4000000
        }
      }
    }
  },
  'profiles/{userId}/coverPhoto': {
    'POST': {
      'handler': 'UserController.saveCoverPhoto',
        'config': {
        'payload': {
          'output': 'stream',
            'parse': true,
              'maxBytes': 4000000
        }
      }
    }
  },
  'profiles/{profileAccountId}': {
    'GET': {
      'handler': 'AccountController.getProfile',
        'config': {
        'auth': false
      }
    }
  },
  'profile': {
    'GET': {
      'handler': 'AccountController.getUserProfile'
    }
  },
  'profiles/{userId}': {
    'PATCH': {
      'handler': 'UserController.patch'
    }
  },
  'vehicleMakes': {
    'GET': {
      'handler': 'VehicleMakeController.getMakes'
    }
  },
  'vehicleModels': {
    'GET': {
      'handler': 'VehicleModelController.getModels'
    }
  },
  'tripFeed': {
    'GET': {
      handler: 'ReservationController.getTripFeed',
      config: {
        plugins: {
            pagination: {
                enabled: true
            }
        }
      }
    }
  },
  'trips': {
    'GET': {
      handler: 'ReservationController.getPastTrips',
      config: {
        plugins: {
            pagination: {
                enabled: true
            }
        }
      }
    }
  },
  'listing/{listingId}/deactivate': {
    'PATCH': {
      handler: 'ListingController.delete'
    }
  },
  'tripPhotos': {
    'PUT': {
      handler: 'TripPhotoController.update',
    }
  },
  'tripPhotos/{tripPhotoId}': {
    'DELETE': {
      handler: 'TripPhotoController.delete'
    }
  }
}