#!/bin/bash
. ./master.config
DOCKER_LOGIN=`aws ecr get-login --no-include-email`
sudo $DOCKER_LOGIN
sudo docker tag itm-api:latest $REPOSITORY_FULL_NAME
sudo docker push $REPOSITORY_FULL_NAME
aws ecs register-task-definition --family ${TASK_NAME} --cli-input-json file://task-definition.json --region ${REGION}
SERVICES=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .failures[]`
REVISION=`aws ecs describe-task-definition --task-definition ${TASK_NAME} --region ${REGION} | jq .taskDefinition.revision`
if [ "$SERVICES" == "" ]; then
  echo "entered existing service"
  DESIRED_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .services[].desiredCount`
  if [ ${DESIRED_COUNT} = "0" ]; then
    DESIRED_COUNT="1"
  fi
  aws ecs update-service --cluster ${CLUSTER} --region ${REGION} --service ${SERVICE_NAME} --task-definition ${TASK_NAME}:${REVISION} --desired-count ${DESIRED_COUNT} --force-new-deployment
fi
