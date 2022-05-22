import express from 'express'
import hydraAdmin from './config.js'

// Sets up csrf protection
const router = express.Router();

function oidcConformityMaybeFakeAcr(request, fallback) {
  if (process.env.CONFORMITY_FAKE_CLAIMS !== '1') {
    return fallback
  }

  return request.oidc_context?.acr_values &&
    request.oidc_context.acr_values.length > 0
    ? request.oidc_context.acr_values[
        request.oidc_context.acr_values.length - 1
      ]
    : fallback
}


function validatePassword(body){
  return  {
    // Subject is an alias for user ID. A subject can be a random string, a UUID, an email address, ....
    subject: body.user || 'foo@bar.com'
  }
}

router.post('/password',  (req, res, next) => {
  const { challenge } = req.body;
  hydraAdmin
  .getLoginRequest(req.body.challenge)
  .then(({ data: loginRequest }) =>
    {
      console.log(JSON.stringify(loginRequest,null,2));
      if (loginRequest.skip) {
        // Skip authenticate
        return hydraAdmin
          .acceptLoginRequest(challenge, {
            // All we need to do is to confirm that we indeed want to log in the user.
            subject: String(loginRequest.subject)
          })
          .then(({ data: body }) => {
            // All we need to do now is to redirect the user back to hydra!
            res.redirect(String(loginRequest.redirect_to))
          })
          .catch(next);
      }
      
      const user = validatePassword(req.body)
      const remember = Boolean(req.body.remember);
      const remember_for = 3600; //seconds
      
  
      // Sets which "level" (e.g. 2-factor authentication) of authentication the user has. The value is really arbitrary
      // and optional. In the context of OpenID Connect, a value of 0 indicates the lowest authorization level.
      // acr: '0',
      //
      // If the environment variable CONFORMITY_FAKE_CLAIMS is set we are assuming that
      // the app is built for the automated OpenID Connect Conformity Test Suite. You
      // can peak inside the code for some ideas, but be aware that all data is fake
      // and this only exists to fake a login system which works in accordance to OpenID Connect.
      //
      // If that variable is not set, the ACR value will be set to the default passed here ('0')
      const acr = oidcConformityMaybeFakeAcr(loginRequest, '0')
      
      if(user != null){
        hydraAdmin.acceptLoginRequest(challenge, {remember, remember_for, acr, ...user}).then(({ data: loginRequest }) => {
          // All we need to do now is to redirect the user back to hydra!
          res.redirect(String(loginRequest.redirect_to))
        })
        .catch(next);
      } 
      else{
        console.log("user not found!");
        res.status(500).json({error:"user not found!"});
        next();
      }
    }
  )
  // This will handle any error that happens when making HTTP calls to hydra
  .catch(next)
})



export default router;