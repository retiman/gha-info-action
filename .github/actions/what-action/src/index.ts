import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import * as util from 'util';

const show = (name: string, data: string, outputDirectory?: string) => {
  let value = data;
  if (name === 'github') {
    const obj = JSON.parse(data);
    // This will be masked in the logs, but not in any other output.
    obj['token'] = '***';
    value = util.inspect(obj, {
      colors: false,
      compact: false,
      depth: 3,
      sorted: true,
    });
  }

  core.startGroup(`Show '${name}' context`);
  core.info(value);
  if (outputDirectory) {
    const outputFile = path.join(outputDirectory, `${name}-context.json`);
    fs.writeFileSync(outputFile, value);
  }
  core.endGroup();
};

const envvars = (outputDirectory?: string) => {
  core.startGroup('Show environment variables');
  const data: Record<string, string | undefined> = {};
  Object.keys(process.env).forEach((key) => {
    data[key] = process.env[key];
  });

  const removable = [
    // This data will be masked but only in the logs.
    'ACTIONS_RUNTIME_TOKEN',
    'GITHUB_TOKEN',
    // This data will already be printed out.  Printing it out again in
    // environment variables makes the output huge.
    'INPUT_ENV-CONTEXT',
    'INPUT_GITHUB-CONTEXT',
    'INPUT_INPUTS-CONTEXT',
    'INPUT_JOB-CONTEXT',
    'INPUT_MATRIX-CONTEXT',
    'INPUT_RUNNER-CONTEXT',
    'INPUT_STEPS-CONTEXT',
    'INPUT_STRATEGY-CONTEXT',
  ];
  removable.forEach((key) => {
    data[key] = '***';
  });

  const value = util.inspect(data, {
    colors: false,
    compact: false,
    depth: 3,
    sorted: true,
  });
  core.info(value);
  if (outputDirectory) {
    const outputFile = path.join(outputDirectory, `env.txt`);
    fs.writeFileSync(outputFile, value);
  }
  core.endGroup();
};

const run = async () => {
  const envContext = core.getInput('env-context', {required: false});
  const githubContext = core.getInput('github-context', {required: false});
  const inputsContext = core.getInput('inputs-context', {required: false});
  const jobContext = core.getInput('job-context', {required: false});
  const matrixContext = core.getInput('matrix-context', {required: false});
  const runnerContext = core.getInput('runner-context', {required: false});
  const stepsContext = core.getInput('steps-context', {required: false});
  const strategyContext = core.getInput('strategy-context', {
    required: false,
  });
  const outputDirectory = core.getInput('output-directory', {
    required: false,
  });

  if (outputDirectory) {
    fs.mkdirSync(outputDirectory);
  }

  envvars(outputDirectory);
  show('env', envContext, outputDirectory);
  show('github', githubContext, outputDirectory);
  show('inputs', inputsContext, outputDirectory);
  show('job', jobContext, outputDirectory);
  show('matrix', matrixContext, outputDirectory);
  show('runner', runnerContext, outputDirectory);
  show('steps', stepsContext, outputDirectory);
  show('strategy', strategyContext, outputDirectory);
};

run();
