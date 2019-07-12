#!/bin/bash
export AWS_SECRET_ACCESS_KEY=TLRw99DyBmQfFbiaoYB3Dv8AgEJwjC798018BUwi 
export AWS_ACCESS_KEY_ID=AKIAJ5RMHBL7C2Q2G3ZQ
. ./${ENVIRONMENT}.config
REGION=$REGION
REPOSITORY_NAME=$REPOSITORY_NAME
CLUSTER=$CLUSTER
FAMILY=`sed -n 's/.*"family": "\(.*\)",/\1/p' taskdef-${ENVIRONMENT}.json`
NAME=`sed -n 's/.*"name": "\(.*\)",/\1/p' taskdef-${ENVIRONMENT}.json`
SERVICE_NAME=${NAME}-service

REPOSITORY_URI=`aws ecr describe-repositories --repository-names ${REPOSITORY_NAME} --region ${REGION} | jq .repositories[].repositoryUri | tr -d '"'`

sed -e "s;%BUILD_NUMBER%;${BUILD_NUMBER};g" -e "s;%REPOSITORY_URI%;${REPOSITORY_URI};g" taskdef-${ENVIRONMENT}.json > ${NAME}-v_${BUILD_NUMBER}.json
aws ecs register-task-definition --family ${FAMILY} --cli-input-json file://${WORKSPACE}/${NAME}-v_${BUILD_NUMBER}.json --region ${REGION}
SERVICES=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .failures[]`
REVISION=`aws ecs describe-task-definition --task-definition ${NAME} --region ${REGION} | jq .taskDefinition.revision`

if [ "$SERVICES" == "" ]; then
  echo "entered existing service"
  DESIRED_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .services[].desiredCount`
  if [ ${DESIRED_COUNT} = "0" ]; then
    DESIRED_COUNT="1"
  fi
  aws ecs update-service --cluster ${CLUSTER} --region ${REGION} --service ${SERVICE_NAME} --task-definition ${FAMILY}:${REVISION} --desired-count ${DESIRED_COUNT} --cli-input-json file://service-definition-update-${ENVIRONMENT}.json
else
  echo "entered new service"
  aws ecs create-service --service-name ${SERVICE_NAME} --desired-count 1 --task-definition ${FAMILY} --cluster ${CLUSTER} --region ${REGION} --cli-input-json file://service-definition-create-${ENVIRONMENT}.json
fi