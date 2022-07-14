import * as core from '@actions/core';

const run = async () => {
  const outputDirectory = core.getInput('output-directory', { required: true });
  const envContext = core.getInput('env-context', { required: true });
  const githubContext = core.getInput('github-context', { required: true });
  const inputsContext = core.getInput('inputs-context', { required: true });
  const jobsContext = core.getInput('jobs-context', { required: true });
  const matrixContext = core.getInput('matrix-context', { required: true });
  const runnerContext = core.getInput('runner-context', { required: true });
  const secretsContext = core.getInput('secrets-context', { required: true });
  const stepsContext = core.getInput('steps-context', { required: true });
  const strategyContext = core.getInput('strategy-context', { required: true });
}

run();
