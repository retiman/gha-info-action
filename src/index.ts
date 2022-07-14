import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const writeContext = (name: string, data: string, outputDirectory?: string) => {
  core.startGroup(`Print '${name}' context`);
  core.info(data);
  if (name != 'secrets' && outputDirectory) {
    const outputFile = path.join(outputDirectory, `${name}.json`);
    fs.writeFileSync(outputFile, data);
  }
  core.endGroup();
}

const run = async () => {
  const envContext = core.getInput('env-context', { required: true });
  const githubContext = core.getInput('github-context', { required: true });
  const inputsContext = core.getInput('inputs-context', { required: true });
  const jobsContext = core.getInput('jobs-context', { required: true });
  const matrixContext = core.getInput('matrix-context', { required: true });
  const runnerContext = core.getInput('runner-context', { required: true });
  const secretsContext = core.getInput('secrets-context', { required: true });
  const stepsContext = core.getInput('steps-context', { required: true });
  const strategyContext = core.getInput('strategy-context', { required: true });
  const outputDirectory = core.getInput('output-directory', { required: false });

  core.info('Print environment variables');
  const data = JSON.stringify(process.env);
  core.info(data);
  if (outputDirectory) {
    const outputFile = path.join(outputDirectory, `envvars.json`);
    fs.writeFileSync(outputFile, data);
  }
  core.endGroup();

  writeContext('env', envContext, outputDirectory);
  writeContext('github', githubContext, outputDirectory);
  writeContext('inputs', inputsContext, outputDirectory);
  writeContext('jobs', jobsContext, outputDirectory);
  writeContext('matrix', matrixContext, outputDirectory);
  writeContext('runner', runnerContext, outputDirectory);
  writeContext('secrets', secretsContext, outputDirectory);
  writeContext('strategy', stepsContext, outputDirectory);
  writeContext('strategyContext', strategyContext, outputDirectory);
}

run();
