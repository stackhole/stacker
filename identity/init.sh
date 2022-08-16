npm install -g create-react-app
npx create-react-app user-ui --template typescript
cd user-ui
npm install --save react-router-dom
npm install --save axios
npm install --save @mui/material @emotion/react @emotion/styled
npm install --save @openid/appauth


______________

hydra clients create \
    --token-endpoint-auth-method none \
    --id client-id \
    --grant-types authorization_code \
    --response-types code \
    --scope openid \
    --callbacks http://my-app.com/callback,http://my-other-app.com/callback