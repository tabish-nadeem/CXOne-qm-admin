#!groovy

library changelog: false, identifier: "PipelineHelper"

def pipeline = loadPipelineTemplate("generic-webapp")

pipeline.runJenkinsFile("pipeline.properties", 'cluster')