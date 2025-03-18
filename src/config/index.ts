import { type Amplify } from 'aws-amplify'

type AmplifyConfig = Parameters<typeof Amplify.configure>[0]

const AWS_CONFIG: AmplifyConfig = {
  auth: {
    aws_region: import.meta.env.VITE_AWS_IDENTITY_REGION,
    user_pool: import.meta.env.VITE_AWS_USER_POOL_ID,
    user_pool_client_id: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
    authentication_flow_type: 'CUSTOM_AUTH',
  },
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
    },
  },
}

const envConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  CONNECTION_TIMEOUT: import.meta.env.VITE_CONNECTION_TIMEOUT || 30000,
}

export const appConfigs = {
  AWS_CONFIG,
  envConfig,
}
