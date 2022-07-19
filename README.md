# stacker
Sandbox for cloud native bootstraps, project starters, automation, and creativity.
## Overview
## Installation
### Providers
[Providers](providers) directory contains setup scripts for baseline infrastructure. Bare metal, virtual machine, and cloud provider provisioning of compute and storage resources for a [Kubernetes](https://kubernetes.io/) cluster
#### Metal
Basic configuration of Kubernetes via microk8s directly on an Ubuntu 20.04-22.04 server. These scripts are heavily personalized and meant for basic installation reference.
#### Vagrant
[Incomplete] Basic configuration of Kubernetes via microk8s VirtualBox-driven virtual machine 
#### AWS
[TODO] Future project: AWS EKS, EC2, ECR, and EBS deployment via Terraform
#### GCP
[TODO] Future project: GCP GKE, GCE, GCR, and GCS deployment via Terraform
### Cluster
This section contains sample [Kustomize](https://kustomize.io/) manifests for enabling typical cloud capabilities on a Kubernetes cluster.
- [Istio](https://istio.io) provides routing, authorization, and other service mesh/security capabilities
- Eventing is demonstrated with [RabbitMQ](https://www.rabbitmq.com/) and [Apache Kafka](https://kafka.apache.org/) via [Strimzi](https://strimzi.io/)
- Storage is provisioned by [OpenEBS](https://openebs.io)
- S3 compatible object storage is provided by [Minio](https://min.io)
- CI/CD is provided by a self-hosted [GitHub Actions](https://docs.github.com/en/actions) runner. *Note* running a self-hosted runner in Kubernetes should probably not be done directly on a production cluster. Spinnaker setup with Minio and Istio routing is demonstrated.
- Caching is provided by Redis
- Setup of a persistent Postgres database with an OpenEBS volume is demonstrated
- Setup of an Ethereum mainnet [geth](https://geth.ethereum.org/) node with an OpenEBS storage volume is demonstrated in [cluster/blockchain](cluster/blockchain)
- [Work In Progress] Identity is provided by a probably insecure custom OAuth2 identity provider based on [Hydra](https://www.ory.sh/docs/hydra). Meant to demonstrate basic user management over multiple, linkable authentication methods including web3, FIDO2, Secure Remote Passwword, and email verification link. 
