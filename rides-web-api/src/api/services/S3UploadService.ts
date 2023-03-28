import {FabrixService as Service} from '@fabrix/fabrix/dist/common'

import * as path from 'path';

import * as AWS from 'aws-sdk';

/**
 * @module S3UploadService
 * @description S3Upload Service
 */
export class S3UploadService extends Service {
  constructor(app) {
    super(app);

    AWS.config.update({region: 'us-east-1'});
  }

  async handleFileUpload(baseKeyPath, file): Promise<{message: string, photoUrl: string}> {
    const {hapi: {filename}} = file

    const extName = path.extname(filename);
    // Set the region 
    AWS.config.update({region: 'us-east-1'});

    const params = {
      Bucket: 'ghanarides.com',
      Body : file,
      Key : `${baseKeyPath}/${Date.now()}${extName}`
    };

    return new Promise<{message: string, photoUrl: string}>((resolve, reject) => {
      // Create S3 service object
      const s3 = new AWS.S3({apiVersion: '2006-03-01'});
      s3.upload(params, function (err, data) {
        // handle error
        if (err) {
          reject(err)
        }

        // success
        if (data) {
          resolve({message: `Upload successfully in ${data.Location}!`, photoUrl: data.Location})
        }
      });
    });
  }
}

