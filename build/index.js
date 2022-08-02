"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const process = __importStar(require("process"));
const show = (name, data, outputDirectory) => {
    core.startGroup(`Show '${name}' context`);
    core.info(data);
    if (outputDirectory) {
        const outputFile = path.join(outputDirectory, `${name}-context.json`);
        fs.writeFileSync(outputFile, data);
    }
    core.endGroup();
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const envContext = core.getInput('env-context', { required: false });
    const githubContext = core.getInput('github-context', { required: false });
    const inputsContext = core.getInput('inputs-context', { required: false });
    const jobContext = core.getInput('job-context', { required: false });
    const matrixContext = core.getInput('matrix-context', { required: false });
    const runnerContext = core.getInput('runner-context', { required: false });
    const secretsContext = core.getInput('secrets-context', { required: false });
    const stepsContext = core.getInput('steps-context', { required: false });
    const strategyContext = core.getInput('strategy-context', { required: false });
    const outputDirectory = core.getInput('output-directory', { required: false });
    core.info('Show environment variables');
    const data = JSON.stringify(process.env);
    core.info(data);
    if (outputDirectory) {
        const outputFile = path.join(outputDirectory, `env.txt`);
        fs.writeFileSync(outputFile, data);
    }
    core.endGroup();
    show('env', envContext, outputDirectory);
    show('github', githubContext, outputDirectory);
    show('inputs', inputsContext, outputDirectory);
    show('job', jobContext, outputDirectory);
    show('matrix', matrixContext, outputDirectory);
    show('runner', runnerContext, outputDirectory);
    show('secrets', secretsContext, outputDirectory);
    show('steps', stepsContext, outputDirectory);
    show('strategy', strategyContext, outputDirectory);
});
run();
//# sourceMappingURL=index.js.map