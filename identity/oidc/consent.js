import express from 'express'
import hydraAdmin from './config.js'

// Sets up csrf protection
const router = express.Router();

router.post('/default',  (req, res, next) => {
  const { consent_challenge, grant_scope } = req.body;
  if (!consent_challenge) {
    next(new Error('Expected a consent challenge to be set but received none.'))
    return
  }
  hydraAdmin
  .getConsentRequest(consent_challenge)
  .then(({ data: consentRequest }) =>
    {
      console.log(JSON.stringify(consentRequest,null,2));
      if (consentRequest.skip) {
        // Skip authenticate
        return hydraAdmin
          .acceptConsentRequest(challenge, {
            grant_scope: body.requested_scope,
            grant_access_token_audience: body.requested_access_token_audience,

            // The session allows us to set session data for id and access tokens
            session: {
              // This data will be available when introspecting the token. Try to avoid sensitive information here,
              // unless you limit who can introspect tokens.
              // accessToken: { foo: 'bar' },
              // This data will be available in the ID token.
              // idToken: { baz: 'bar' },
            }
          })
          .then(({ data: body }) => {
            // All we need to do now is to redirect the user back to hydra!
            res.redirect(String(body.redirect_to))
          })
          .catch(next);
      }
      else{
                  // The session allows us to set session data for id and access tokens
          let session = {
            // This data will be available when introspecting the token. Try to avoid sensitive information here,
            // unless you limit who can introspect tokens.
            access_token: {
              // foo: 'bar'
            },

            // This data will be available in the ID token.
            id_token: {
              // baz: 'bar'
            }
          }

          // Here is also the place to add data to the ID or access token. For example,
          // if the scope 'profile' is added, add the family and given name to the ID Token claims:
          // if (grantScope.indexOf('profile')) {
          //   session.id_token.family_name = 'Doe'
          //   session.id_token.given_name = 'John'
          // }
          const remember = true;
          const remember_for = 3600;
          // Let's fetch the consent request again to be able to set `grantAccessTokenAudience` properly.
          hydraAdmin
            .getConsentRequest(consent_challenge)
            // This will be called if the HTTP request was successful
            .then(({ data: body }) => {
              return hydraAdmin
                .acceptConsentRequest(consent_challenge, {
                  grant_scope,
                  session,
                  grant_access_token_audience: body.requested_access_token_audience,
                  remember,
                  remember_for
                })
                .then(({ data: body }) => {
                  // All we need to do now is to redirect the user back to hydra!
                  const { redirect_to } = body
                  res.status(200).json({redirect_to});
                })
            })
            .catch(next)
      }
    }
  ).catch(next)
})



export default router;