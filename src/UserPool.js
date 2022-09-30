import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
  UserPoolId: 'us-east-2_6JczAkcib',
  ClientId: '585cf56cgnbpi1d5rv0ce8u20k',
};
export default new CognitoUserPool(poolData);