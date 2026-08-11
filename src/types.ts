export interface GPUStats {
  gpuName: string;
  vramUsedGB: number | string;
  vramTotalGB: number;
  gpuUtilizationPercent: number;
  cudaKernelsActive: number;
  tokensPerSecond: number;
  inferenceLatencyMs: number;
  tensorFlowVersion: string;
  pythonRuntime: string;
  batchSize: number;
  quantization: string;
  activeAgents: number;
}

export interface GrowthPlanPhase {
  week: number;
  phaseName: string;
  actionItems: string[];
}

export interface MarketingChannel {
  platform: string;
  strategy: string;
  samplePost: string;
  postFrequency: string;
}

export interface EmailSequenceItem {
  day: number;
  subject: string;
  previewText: string;
  bodySnippet: string;
}

export interface LeadMagnetFunnel {
  title: string;
  hookCopy: string;
  emailSequence: EmailSequenceItem[];
}

export interface CampaignData {
  brandHeadline: string;
  positioningStatement: string;
  growth30DayPlan: GrowthPlanPhase[];
  channels: MarketingChannel[];
  leadMagnetFunnel: LeadMagnetFunnel;
  viralHookIdeas: string[];
  estimatedMonthlyRevenueUSD: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PythonScriptData {
  filename: string;
  pythonCode: string;
  installationCommand: string;
  performanceBreakdown: {
    throughputTokensPerSec: number;
    latencyMs: number;
    gpuMemMB: number;
  };
}

export interface UserBusinessContext {
  founderAge?: number;
  brandName?: string;
  niche?: string;
  monthlyTargetUSD?: number;
}
