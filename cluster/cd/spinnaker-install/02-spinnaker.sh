CONTEXT=$(kubectl config current-context)
# This service account uses the ClusterAdmin role -- this is not necessary,
# more restrictive roles can by applied.
kubectl apply --context $CONTEXT -f https://spinnaker.io/downloads/kubernetes/service-account.yml
TOKEN=$(kubectl get secret --context $CONTEXT $(kubectl get serviceaccount spinnaker-service-account --context $CONTEXT -n spinnaker -o jsonpath='{.secrets[0].name}') -n spinnaker -o jsonpath='{.data.token}' | base64 --decode)
kubectl config set-credentials ${CONTEXT}-token-user --token $TOKEN
kubectl config set-context $CONTEXT --user ${CONTEXT}-token-user
hal config provider kubernetes enable
hal config provider kubernetes account add my-k8s-account --context $CONTEXT
hal config deploy edit --type distributed --account-name my-k8s-account
hal version list
hal config version edit --version 1.26.6



mkdir ~/.hal/default/profiles
echo "spinnaker.s3.versioning: false" > ~/.hal/default/profiles/front50-local.yml
cat ~/.hal/default/profiles/front50-local.yml

MINIO_SECRET_KEY=CHANGE_ME
MINIO_ACCESS_KEY=CHANGE_ME
ENDPOINT=minio-cli-service.default.svc.cluster.local:9000

echo $MINIO_SECRET_KEY | hal config storage s3 edit --endpoint $ENDPOINT --access-key-id $MINIO_ACCESS_KEY --secret-access-key 
                        
hal config storage edit --type s3
hal deploy apply
hal deploy connect

######
hal config security ui edit --override-base-url https://192.168.1.70/spinnaker/
hal config security api edit --override-base-url https://192.168.1.70/spin-gate/