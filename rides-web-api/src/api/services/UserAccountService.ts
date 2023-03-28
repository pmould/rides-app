import {FabrixService as Service} from '@fabrix/fabrix/dist/common'
import * as crypto from 'crypto'
import * as nodemailer from 'nodemailer'
import * as htmlToText from 'html-to-text';
import {jwtSecret, googleEmailClientId, googleEmailSecretId, googleEmailRefreshToken, appEmailAddress} from '../constants'
import * as bluebird from 'bluebird';

import * as JWT from 'jsonwebtoken'

const verifyJWT = bluebird.promisify(JWT.verify);


/**
 * @module UserService
 * @description services to save a user
 */
export class UserAccountService extends Service {
  async save(password, createdUser) {
    const {UserAccount} = this.app.models;

    // creating a unique salt for a particular user 
    const passwordSalt = crypto.randomBytes(16).toString('hex');

    // hashing user's salt and password with 1000 iterations, 
    // 64 length and sha512 digest 
    const passwordHash = crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512').toString(`hex`);

    const userAccount = UserAccount.build({password: passwordHash, passwordSalt});
    
    return createdUser.setUserAccount(userAccount);
  }

  validPassword(password, userAccount) { 
    const passwordSalt = userAccount.passwordSalt;
    const hash = crypto.pbkdf2Sync(password,  
      passwordSalt, 1000, 64, `sha512`).toString(`hex`); 
    return userAccount.password === hash; 
  }

  async sendVerificationEmail(email, user) {
    const {UserAccount} = this.app.models;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: appEmailAddress,
        clientId: googleEmailClientId,
        clientSecret: googleEmailSecretId,
        refreshToken: googleEmailRefreshToken
      }
    });

    const userAccountId = user.userAccount.id;
    const authToken = JWT.sign({
      authTokenUserAccountId: userAccountId
    }, jwtSecret);

    await UserAccount.update({
      confirmationEmailToken: authToken
    }, {
      where: {id: userAccountId}  
    });

    const confirmationLink = `${this.config.get('envConfig.ghRidesAppBaseUrl')}userAccountActivation?authToken=${authToken}`;

    const verificationEmailMessageHtml = `<div>Hi ${user.firstName},</div><br>
<div>Click on the link below to complete your registration:</div><br>
${confirmationLink}
<br><br>
<div>- Ghana Rides Support Team</div>`;
    
    // TODO: Create HMTL version    

    const messageInfo = await transporter.sendMail({
      from: 'Ghana Rides 👥 ghanarides@gmail.com',
      to: 'paul.mould1@gmail.com',
      subject: 'Ghana Rides Account Verfication Email',
      text: htmlToText.fromString(verificationEmailMessageHtml),
      html: verificationEmailMessageHtml
    });

    console.log("Message sent: %s", messageInfo.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(messageInfo));
    return true;
  
  }

  async verifyPasswordReset(authToken) {
    const {UserAccount, User} = this.app.models;

    let inValidJWT;
    const decodedData = await verifyJWT(authToken, jwtSecret)
      .catch(() => inValidJWT = true);
    
    const userAccountId = decodedData && decodedData.authTokenUserAccountId;

    if (inValidJWT || !userAccountId) {
      return false;
    }  

    const userAccount = await UserAccount.findById(userAccountId);

    return userAccount.passwordReminderToken === authToken;
  }

  async updatePassword(password, authToken, userId) {
    const {UserAccount} = this.app.models;

    let userAccount;
    let inValidJWT;
    if(authToken) {
      const decodedData = await verifyJWT(authToken, jwtSecret, (err, decoded) => {

      }).catch(() => inValidJWT = true);
      const userAccountId = decodedData && decodedData.authTokenUserAccountId;

      if (inValidJWT || !userAccountId) {
        return false;
      }

      userAccount = await UserAccount.findById(userAccountId);

      // If user has authToken it should equal the authToken saved in the database
      if (authToken && authToken !== userAccount.passwordReminderToken) {
        return false;
      }
    }
    else if (userId) {
      userAccount = await UserAccount.findOne({
        where: {userId}
      });
    }
    else {
      return false;
    }

    const passwordSalt = crypto.randomBytes(16).toString('hex');

    // hashing user's salt and password with 1000 iterations, 
    // 64 length and sha512 digest 
    const passwordHash = crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512').toString(`hex`);
    
    if(userAccount) {
      await userAccount.updateAttributes({
        password: passwordHash,
        passwordSalt,
        passwordReminderToken: null
      });
    }
    else {
      // TODO: Remove Temporary Fix for no UserAccount record for existing user
      await UserAccount.create({
        userId,
        password: passwordHash,
        passwordSalt,
        passwordReminderToken: null
      });
    }


    return true;
  }

  async sendResetPasswordEmail(email) {

    const {User, UserAccount} = this.app.models;
    const user = await User.findByUserAccountEmail(email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: appEmailAddress,
        clientId: googleEmailClientId,
        clientSecret: googleEmailSecretId,
        refreshToken: googleEmailRefreshToken
      }
    });

    const userAccountId = user.userAccount && user.userAccount.id;
    if (!userAccountId) {
      return true; // No Account exists. Return true for security reasons
    }
    const authToken = JWT.sign({
      authTokenUserAccountId: userAccountId,
    }, jwtSecret, {
      expiresIn: '1h'
    });

    await UserAccount.update({
      passwordReminderToken: authToken
    }, {
      where: {id: userAccountId}  
    });

    const confirmationLink = `${this.config.get('envConfig.ghRidesAppBaseUrl')}changePassword?authToken=${authToken}`;

    const verificationEmailMessageHtml = `<div>Hi ${user.firstName},</div><br>
<div>Click on the link below to reset your account password:</div><br>
${confirmationLink}
<br><br>
<div>- Ghana Rides Support Team</div>`;
    
    // TODresetPasswordO: Create HMTL version    

    const messageInfo = await transporter.sendMail({
      from: 'Ghana Rides 👥 ghanarides@gmail.com',
      to: 'paul.mould1@gmail.com',
      subject: 'Ghana Rides Account Password Reset',
      text: htmlToText.fromString(verificationEmailMessageHtml),
      html: verificationEmailMessageHtml
    });

    console.log("Message sent: %s", messageInfo.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(messageInfo));
    return true;
  
  }

  async activateAccount(confirmationEmailToken) {
    const {User, UserAccount} = this.app.models;
  
    let inValidJWT;
    const decodedData = await verifyJWT(confirmationEmailToken, jwtSecret, (err, decoded) => {

    }).catch(() => inValidJWT = true);

    const userAccountId = decodedData && decodedData.authTokenUserAccountId;

    if (inValidJWT || !userAccountId) {
      return false;
    }  

    const foundUser = await User.findOne({
      include: [
        {
          association: User.instance.associations.userAccount,
          where: {
            id: userAccountId
          },
          required: true
        }
      ]
    });

    const userId = foundUser.id;
    const result = await User.update({isActive: true}
      , {
      where: {
        id: userId,
      },
      returning: true  
    });
    const user = result[1][0];
    if (user.id != userId || !user.isActive)
    {
      return false;
    }  

    return true; 
  }
}