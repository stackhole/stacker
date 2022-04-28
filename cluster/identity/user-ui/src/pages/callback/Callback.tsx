import React, {useEffect, useState} from 'react';
import {
    TokenRequest,
    BaseTokenRequestHandler,
    GRANT_TYPE_AUTHORIZATION_CODE,
    AuthorizationServiceConfiguration,
    RedirectRequestHandler,
    AuthorizationNotifier,
    FetchRequestor, LocalStorageBackend, DefaultCrypto, BasicQueryStringUtils
} from '@openid/appauth';
import { useNavigate, useParams } from 'react-router-dom';

const Callback = (props: any) => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    let code = useParams();

    useEffect(() => {
        const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
        const authorizationHandler = new RedirectRequestHandler(new LocalStorageBackend(), new BasicQueryStringUtils(), window.location, new DefaultCrypto());
        const notifier = new AuthorizationNotifier();
        authorizationHandler.setAuthorizationNotifier(notifier);
        notifier.setAuthorizationListener((request, response, error) => {
            console.log('Authorization request complete ', request, response, error);
            if (response) {
                console.log(`Authorization Code  ${response.code}`);

                const tokenRequest = new TokenRequest({
                    client_id: process.env.REACT_APP_CLIENT_ID || '',
                    redirect_uri: process.env.REACT_APP_REDIRECT_URI || '',
                    grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
                    code: response?.code,
                    extras: (request && request.internal) ? {code_verifier: request.internal.code_verifier} : {}
                });

                AuthorizationServiceConfiguration.fetchFromIssuer(process.env.REACT_APP_ISSUER || '', new FetchRequestor())
                    .then((oResponse) => {
                        const configuration = oResponse;
                        return tokenHandler.performTokenRequest(configuration, tokenRequest);
                    })
                    .then((oResponse) => {
                        localStorage.setItem('access_token', oResponse.accessToken);
                        console.log(oResponse.accessToken);
                        navigate("/view/user/me");
                    })
                    .catch(oError => {
                        setError(oError);
                    });
            }
        });

        if (!code) {
            console.log('Unable to get authorization code');
            return;
        }
        authorizationHandler.completeAuthorizationRequestIfPossible();
    }, [code, navigate, props]);

    return (
        <div className="container-fluid" style={{marginTop: '10px'}}>
            <div className="card">
                {
                    code ?
                        <div className="card-body">
                            <h5 className="card-title">Loading...</h5>
                        </div>
                        :
                        <div className="card-body bg-danger">
                            <div className="card-body">
                                <p className="card-text">{error}</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default Callback;