kubectl exec -it oidc-postgres-66495857cc-f9rlf -c hydra -- /bin/sh
hydra clients create --endpoint https://192.168.1.70/oidc --id  client-id --secret client-secret --grant-types authorization_code --response-types code --scope openid --callbacks http://localhost:3000/view/callback

hydra clients create --endpoint http://localhost:4445  --token-endpoint-auth-method none --callbacks http://localhost:3000/view/callback,http://localhost:3000/view/users/me

hydra clients create \
    --endpoint https://192.168.1.70/oidc \
    --id my-client \
    --secret secret \
    -g client_credentials