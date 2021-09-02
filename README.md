Travis Status [![Build Status](https://app.travis-ci.com/fr3d3rico/cloud-developer-capstone.svg?branch=main)](https://app.travis-ci.com/fr3d3rico/cloud-developer-capstone)
Circleci Status [![CircleCI](https://circleci.com/gh/fr3d3rico/cloud-developer-capstone.svg?style=shield)](https://circleci.com/gh/fr3d3rico/cloud-developer-capstone)

# Cloud Developer Capstone - Option 1

This project aims to meet the final project of the Udacity Cloud Developer course. I chose design option 1 with deploy container in AWS EKS service.

# Archtecture

## CI/CD - Continuous Integration / Continuous Delivery

This project aims to meet CI/CD automation requirements.

## Travis Pipeline

The following is an image of how CI (Continuous Integration) is used on Travis to generate the image and make it publicly available on the Docker Hub.
This pipeline is configured here [.travis.yml]

[![Travis Pipeline](https://github.com/fr3d3rico/cloud-developer-capstone/blob/dev/images/travis-pipeline.jpeg)](https://github.com/fr3d3rico/cloud-developer-capstone/blob/dev/images/travis-pipeline.jpeg)

## Circleci Pipeline

Below is an image of the CI/CD to download the image, create the container, test the application and deploy it on AWS EKS.
This pipeline is configured here [.circleci/config.yml]

[![Circleci Pipeline 1](https://github.com/fr3d3rico/cloud-developer-capstone/blob/dev/images/circleci-pipeline1.jpeg)](https://github.com/fr3d3rico/cloud-developer-capstone/blob/dev/images/circleci-pipeline1.jpeg)
[![Circleci Pipeline 2](https://github.com/fr3d3rico/cloud-developer-capstone/blob/dev/images/circleci-pipeline2.jpeg)](https://github.com/fr3d3rico/cloud-developer-capstone/blob/dev/images/circleci-pipeline2.jpeg)

# Requirements

## Local Machine

| Candy | Link |
| ----- | ---- |
| Docker | [Docker](https://www.docker.com/) |
| Node 13 / 14 | [Node.js](https://nodejs.org/) |
| NPM | [NPM](https://www.npmjs.com/) |
| Git | [GIT](https://git-scm.com/) |
| AWS cli | [AWS cli](https://aws.amazon.com/cli/) |
| Kubectl cli | [kubectl](https://kubernetes.io/docs/tasks/tools/) |

## Internet Tools and Services
| Flavor | Link |
| ----- | ---- |
| AWS Account | [AWS account](https://aws.amazon.com/account/) |
| AWS IAM User Account | [AWS account](https://aws.amazon.com/iam/) |
| AWS CloudFormation | [AWS CloudFormation](https://aws.amazon.com/cloudformation/) |
| AWS API Gateway | [AWS API Gateway](https://aws.amazon.com/api-gateway/) |
| Docker Hub Account | [Docker Hub Account](https://hub.docker.com/) |
| Travis Account | [Travis Account](https://www.travis-ci.com/) |
| CircleCi Account | [CircleCi Account](https://circleci.com/) |
| Github Repository | [Github Repository](https://github.com/) |

# How to...

### Create an AWS Account [AWS account](https://aws.amazon.com/account/)

### Create an AWS IAM user account [AWS IAM user account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)

Remember to save access key and secret for Circleci settings.

### Configure Your AWS cli to new credentials for the user created

[AWS Configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

### (Optional) Create a Role to EKS

In my case, I had to create an IAM Role to have access and be able to create the EKS cluster.

This is the Cloud Formation to create this Role.

```sh
aws cloudformation create-stack --stack-name eksClusterRole-CloudFormation --region YOUR_AWS_REGION --template-body file://cloudformation/cloudformation-create-role.yml --capabilities "CAPABILITY_IAM"
```

[cloudformation/cloudformation-create-role.yml]

### Create an EKS Cluster

[EKS Cluster](https://aws.amazon.com/eks/getting-started/)

In my case, AWS only allow me specify 4 of 6 subnets. 
*eksClusterRole-CloudFormati-eksClusterRole* is the name of Role created on step above.

```sh
aws eks create-cluster --region YOUR_AWS_REGION --name EKS_NAME_CLUSTER --kubernetes-version 1.20 --role-arn arn:aws:iam::YOUR_AWS_CODE_ACCOUNT:role/eksClusterRole-CloudFormati-eksClusterRole    --resources-vpc-config subnetIds=subnet-1,subnet-2,subnet-3,subnet-4,securityGroupIds=ID_SECURITY_GROUP
```

### Create a group node for this EKS Cluster

[Amazon EKS managed node group](https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html)

This is the machines that will run the Kubernetes Pods[Kubernetes Pods](https://kubernetes.io/docs/concepts/workloads/pods/)


### Create an API Gateway for HTTP API

[API Gateway for HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop.html#http-api-examples)

Export apigateway.yml configuration. My config file is like [apigateway.yml]

After create, get and sabe *API ID* and *Invoke URL*. Replace on [apigateway.yml] 

```yml
...
servers:
- url: "REPLACE_HERE/{basePath}"
...
```

### Comit your project on github

### Create an Travis account and connect your github repository with it

[Travis Account](https://www.travis-ci.com/)

Access Travis project settings and add two environment variables to access Docker Hub.

```sh
DOCKER_PASSWORD
DOCKER_USERNAME
```

### Create an Circleci Account and connect your github respository with it too

[CircleCi Account](https://circleci.com/)

Access Circleci project settings and add two environment variables to AWS cli use in containers.

```sh
AWS_ACCESS_KEY_ID
AWS_API_GATEWAY_ID
AWS_DEFAULT_REGION
AWS_SECRET_ACCESS_KEY
```

Remember, *AWS_ACCESS_KEY_ID* and *AWS_SECRET_ACCESS_KEY* are the same create for IAM user.
*AWS_API_GATEWAY_ID* set here the *API ID* from AWS API Gateway

# How it works?

- After commit anything on github repo, the Travis and Circleci services will start each pipeline.
- After it is deployed, you can perform the command *kubectl get all* to access pods and containers running.
- To test you can hit, in my case, (https://2f3e0nx5j3.execute-api.us-east-1.amazonaws.com) and (https://2f3e0nx5j3.execute-api.us-east-1.amazonaws.com/hello/YOUR_NAME_HERE)

# Links and Learn More

- [Configure Travis Status Image](https://docs.travis-ci.com/user/status-images/)
- [Configure Circleci Status Image](https://circleci.com/docs/2.0/status-badges/)

- [Edit MD files online](https://dillinger.io/)
- [Create charts online](https://www.lucidchart.com/)

- [Kubernetes cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

- [What is EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Getting Started EKSCTL](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)

- [My personal Docker Hub](https://hub.docker.com/u/fr3d3rico)
- [Docker Hub vs AWS ECR](https://cloudonaut.io/amazon-ecr-vs-docker-hub-vs-github-container-registry/)

- [What is CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd)

- [Learn more about EKS](https://www.eksworkshop.com/)

# Feel free to Getting in Touch!