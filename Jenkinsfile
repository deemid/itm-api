pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'sudo docker build --no-cache -t itm-api .'
        sh 'sudo docker build --no-cache -f Dockerfile.transfer -t itm-watch-transfer .'
      }
    }
    stage('Deploy') {
      steps {
        sh 'chmod +x ecr-push-master.sh'
        sh './ecr-push-master.sh'
        sh 'chmod +x ecr-push-watcher-master.sh'
        sh './ecr-push-watcher-master.sh'
      }
    }
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
}