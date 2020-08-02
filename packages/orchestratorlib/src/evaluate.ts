/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from 'path';

import {MultiLabelConfusionMatrix} from '@microsoft/bf-dispatcher';
import {MultiLabelConfusionMatrixSubset} from '@microsoft/bf-dispatcher';

import {LabelType} from './label-type';
import {ScoreStructure}  from './score-structure';

import {LabelResolver} from './labelresolver';

import {Utility} from './utility';

export class OrchestratorEvaluate {
  // eslint-disable-next-line max-params
  public static async runAsync(
    inputPath: string, outputPath: string, nlrPath: string = '',
    ambiguousClosenessParameter: number = Utility.DefaultAmbiguousClosenessParameter,
    lowConfidenceScoreThresholdParameter: number = Utility.DefaultLowConfidenceScoreThresholdParameter,
    multiLabelPredictionThresholdParameter: number = Utility.DefaultMultiLabelPredictionThresholdParameter,
    unknownLabelPredictionThresholdParameter: number = Utility.DefaultUnknownLabelPredictionThresholdParameter): Promise<void> {
    // ---- NOTE ---- process arguments
    if (Utility.isEmptyString(inputPath)) {
      Utility.debuggingThrow('Please provide path to an input .blu file');
    }
    if (Utility.isEmptyString(outputPath)) {
      Utility.debuggingThrow('Please provide an output directory');
    }
    if (nlrPath) {
      nlrPath = path.resolve(nlrPath);
    } else {
      nlrPath = '';
    }
    const ambiguousCloseness: number = ambiguousClosenessParameter;
    const lowConfidenceScoreThreshold: number = lowConfidenceScoreThresholdParameter;
    const multiLabelPredictionThreshold: number = multiLabelPredictionThresholdParameter;
    const unknownLabelPredictionThreshold: number = unknownLabelPredictionThresholdParameter;
    Utility.debuggingLog(`inputPath=${inputPath}`);
    Utility.debuggingLog(`outputPath=${outputPath}`);
    Utility.debuggingLog(`nlrPath=${nlrPath}`);
    Utility.debuggingLog(`ambiguousCloseness=${ambiguousCloseness}`);
    Utility.debuggingLog(`lowConfidenceScoreThreshold=${lowConfidenceScoreThreshold}`);
    Utility.debuggingLog(`multiLabelPredictionThreshold=${multiLabelPredictionThreshold}`);
    Utility.debuggingLog(`unknownLabelPredictionThreshold=${unknownLabelPredictionThreshold}`);
    // ---- NOTE ---- load the training set
    const trainingFile: string = inputPath;
    if (!Utility.exists(trainingFile)) {
      Utility.debuggingThrow(`training set file does not exist, trainingFile=${trainingFile}`);
    }
    const trainingSetScoreOutputFile: string = path.join(outputPath, 'orchestrator_training_set_scores.txt');
    const trainingSetSummaryOutputFile: string = path.join(outputPath, 'orchestrator_training_set_summary.html');
    const labelsOutputFilename: string = path.join(outputPath, 'orchestrator_labels.txt');

    Utility.debuggingLog('OrchestratorEvaluate.runAsync(), ready to call LabelResolver.createWithSnapshotAsync()');
    const labelResolver: any = await LabelResolver.createWithSnapshotAsync(nlrPath, trainingFile);
    Utility.debuggingLog('OrchestratorEvaluate.runAsync(), after calling LabelResolver.createWithSnapshotAsync()');

    // ---- NOTE ---- retrieve labels
    const labels: string[] = labelResolver.getLabels(LabelType.Intent);
    if (Utility.toPrintDetailedDebuggingLogToConsole) {
      // Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(labelArrayAndMap.stringArray)=${JSON.stringify(labelArrayAndMap.stringArray)}`);
      // Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(labelArrayAndMap.stringMap)=${JSON.stringify(labelArrayAndMap.stringMap)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(labels)=${JSON.stringify(labels)}`);
    }

    // ---- NOTE ---- retrieve examples, process the training set, retrieve labels, and create a label-index map.
    const utteranceLabelsMap: { [id: string]: string[] } = {};
    const utteranceLabelDuplicateMap: Map<string, Set<string>> = new Map<string, Set<string>>();
    const examples: any = labelResolver.getExamples();
    if (examples.length <= 0) {
      Utility.debuggingThrow('there is no example, something wrong?');
    }
    Utility.examplesToUtteranceLabelMaps(examples, utteranceLabelsMap, utteranceLabelDuplicateMap);
    Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), examples.length=${examples.length}`);
    if (Utility.toPrintDetailedDebuggingLogToConsole) {
      const examples: any = labelResolver.getExamples();
      const example: any = examples[0];
      const example_text: string = example.text;
      const labels: any = example.labels;
      const label: any = labels[0];
      const label_name: string = label.name;
      const label_type: any = label.label_type;
      const span: any = label.span;
      const offset: number = span.offset;
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), examples.length=${examples.length}`);
      const length: number = span.length;
      // Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(examples)=${JSON.stringify(examples)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(example)=${JSON.stringify(example)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), Object.keys(example)=${Object.keys(example)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), example_text=${example_text}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(labels)=${JSON.stringify(labels)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), Object.keys(labels)=${Object.keys(labels)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(label)=${JSON.stringify(label)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), Object.keys(label)=${Object.keys(label)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), label.name=${label_name}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), label.label_type=${label_type}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), JSON.stringify(span)=${JSON.stringify(span)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), Object.keys(span)=${Object.keys(span)}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), label.span.offset=${offset}`);
      Utility.debuggingLog(`OrchestratorEvaluate.runAsync(), label.span.length=${length}`);
    }

    // ---- NOTE ---- integrated step to produce analysis reports.
    Utility.resetLabelResolverSettingIgnoreSameExample(labelResolver, true);
    const evaluationOutput: {
      'evaluationReportLabelUtteranceStatistics': {
        'evaluationSummaryTemplate': string;
        'labelArrayAndMap': {
          'stringArray': string[];
          'stringMap': {[id: string]: number};};
        'labelStatisticsAndHtmlTable': {
          'labelUtterancesMap': { [id: string]: string[] };
          'labelUtterancesTotal': number;
          'labelStatistics': string[][];
          'labelStatisticsHtml': string;};
        'utteranceStatisticsAndHtmlTable': {
          'utteranceStatisticsMap': {[id: number]: number};
          'utteranceStatistics': [string, number][];
          'utteranceCount': number;
          'utteranceStatisticsHtml': string;};
        'utterancesMultiLabelArrays': [string, string][];
        'utterancesMultiLabelArraysHtml': string;
        'utteranceLabelDuplicateHtml': string; };
      'evaluationReportAnalyses': {
        'evaluationSummaryTemplate': string;
        'ambiguousAnalysis': {
          'scoringAmbiguousUtterancesArrays': string[][];
          'scoringAmbiguousUtterancesArraysHtml': string;
          'scoringAmbiguousUtteranceSimpleArrays': string[][];};
        'misclassifiedAnalysis': {
          'scoringMisclassifiedUtterancesArrays': string[][];
          'scoringMisclassifiedUtterancesArraysHtml': string;
          'scoringMisclassifiedUtterancesSimpleArrays': string[][];};
        'lowConfidenceAnalysis': {
          'scoringLowConfidenceUtterancesArrays': string[][];
          'scoringLowConfidenceUtterancesArraysHtml': string;
          'scoringLowConfidenceUtterancesSimpleArrays': string[][];};
        'confusionMatrixAnalysis': {
          'confusionMatrix': MultiLabelConfusionMatrix;
          'multiLabelConfusionMatrixSubset': MultiLabelConfusionMatrixSubset;
          'scoringConfusionMatrixOutputLines': string[][];
          'confusionMatrixMetricsHtml': string;
          'confusionMatrixAverageMetricsHtml': string;}; };
        'scoreStructureArray': ScoreStructure[];
    } =
    Utility.generateEvaluationReport(
      labelResolver,
      labels,
      utteranceLabelsMap,
      utteranceLabelDuplicateMap,
      labelsOutputFilename,
      trainingSetScoreOutputFile,
      trainingSetSummaryOutputFile,
      ambiguousCloseness,
      lowConfidenceScoreThreshold,
      multiLabelPredictionThreshold,
      unknownLabelPredictionThreshold);
    if (Utility.toPrintDetailedDebuggingLogToConsole) {
      Utility.debuggingLog(`evaluationOutput=${Utility.jsonStringify(evaluationOutput)}`);
    }

    // ---- NOTE ---- THE END
    Utility.debuggingLog('OrchestratorEvaluate.runAsync(), THE END');
  }
}
