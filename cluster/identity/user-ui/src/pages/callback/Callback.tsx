import React, {useState} from 'react';
import {
    TokenRequest,
    BaseTokenRequestHandler,
    GRANT_TYPE_AUTHORIZATION_CODE,
    AuthorizationServiceConfiguration,
    RedirectRequestHandler,
    AuthorizationNotifier,
    FetchRequestor, LocalStorageBackend, DefaultCrypto
} from '@openid/appauth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NoHashQueryStringUtils } from '../../noHashQueryStringUtils';

const Callback = (props: any) => {

    let [searchParams] = useSearchParams();
    const code = searchParams.get("code") || '';
    const state = searchParams.get("state") || '';
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const authorizationHandler = new RedirectRequestHandler(new LocalStorageBackend(), new NoHashQueryStringUtils(), window.location, new DefaultCrypto());
    const notifier = new AuthorizationNotifier();
    authorizationHandler.setAuthorizationNotifier(notifier);
    notifier.setAuthorizationListener((request, response, error) => {
        if (response) {
            let extras = {code_verifier: ''};
            if (request && request.internal) {
                extras.code_verifier = request.internal.code_verifier;
            }
            const tokenRequest = new TokenRequest({
                client_id: process.env.REACT_APP_CLIENT_ID || '',
                redirect_uri: process.env.REACT_APP_REDIRECT_URI || '',
                grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
                code: code,
                refresh_token: undefined,
                extras
            });

            const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
            AuthorizationServiceConfiguration.fetchFromIssuer(process.env.REACT_APP_ISSUER || '', new FetchRequestor())
                .then((oResponse) => {
                    const configuration = oResponse;
                    return tokenHandler.performTokenRequest(configuration, tokenRequest);
                })
                .then((oResponse) => {
                    localStorage.setItem('access_token', oResponse.accessToken);
                    console.log(oResponse.accessToken);
                    const redir:string = Buffer.from(state, 'base64').toString('ascii');
                    if(redir.indexOf('http')===0){
                        console.log(redir);
                        window.location = redir as ((string | Location) & Location);
                    }
                    else{
                        //navigate("/view/user/me");
                    }

                    ///console.log(Buffer.from("Hello World").toString('base64'));
//console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'));
                    
                   // buf.toString('base64')
                })
                .catch(oError => {
                    setError(oError);
                });
            }
        });

    authorizationHandler.completeAuthorizationRequestIfPossible();

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