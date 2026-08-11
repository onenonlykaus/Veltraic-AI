import React, { useState } from 'react';
import { Terminal, Cpu, Zap, Download, Copy, RefreshCw, CheckCircle, Play, Server, Layers, Code, Shield } from 'lucide-react';
import { GPUStats, PythonScriptData } from '../types';
import { SAMPLE_PYTHON_SCRIPT } from '../data/defaultTemplates';

interface PythonGpuEngineProps {
  gpuStats: GPUStats | null;
  onNotify: (msg: string) => void;
}

export const PythonGpuEngine: React.FC<PythonGpuEngineProps> = ({ gpuStats, onNotify }) => {
  const [scriptData, setScriptData] = useState<PythonScriptData>(SAMPLE_PYTHON_SCRIPT);
  const [modelTask, setModelTask] = useState('High-Speed AI Marketing Campaign & Lead Vectorization');
  const [framework, setFramework] = useState('TensorFlow 2.16.1 (CUDA 12.2)');
  const [loading, setLoading] = useState(false);

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/python-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelTask, framework }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate Python architecture script.');
      }

      setScriptData(data.scriptData);
      onNotify('⚡ Generated custom Python + TensorFlow GPU script!');
    } catch (err: any) {
      console.error(err);
      onNotify(`Error: ${err.message || 'Failed to generate Python script'}`);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(scriptData.pythonCode);
    onNotify('Copied Python script to clipboard!');
  };

  const downloadPythonScript = () => {
    const blob = new Blob([scriptData.pythonCode], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = scriptData.filename || 'kentra_tf_gpu_engine.py';
    document.body.appendChild(a);
    a.click();
    a.remove();
    onNotify(`Downloaded ${scriptData.filename}!`);
  };  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* GPU Cluster Live Telemetry Card */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-900/10 border border-indigo-500/20 rounded-lg text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 tracking-tight">
                ZYVRAN GPU ARCHITECTURE
                <span className="text-[10px] font-mono font-bold text-green-400 bg-green-900/10 px-2 py-0.5 rounded border border-green-500/20 uppercase tracking-widest">
                  NVIDIA H100 SXM5 Cluster
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Python 3.11.8 Runtime • TensorFlow 2.16.1 CUDA Vector Pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#141414] border border-[#222] rounded-lg text-xs font-mono text-indigo-400 font-semibold">
              Sub-20ms Latency Engine
            </span>
          </div>
        </div>

        {/* Live Gauges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">GPU Model</div>
            <div className="text-sm font-bold text-white mt-1 truncate">H100 SXM5 80GB</div>
            <div className="text-[10px] text-green-400 mt-0.5">Cluster Active</div>
          </div>

          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Inference Latency</div>
            <div className="text-base font-bold text-purple-400 mt-1">{gpuStats?.inferenceLatencyMs || '16.8'} ms</div>
            <div className="text-[10px] text-gray-500">Target &lt;20ms</div>
          </div>

          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Throughput</div>
            <div className="text-base font-bold text-indigo-400 mt-1">{gpuStats?.tokensPerSecond || '154'} tps</div>
            <div className="text-[10px] text-gray-500">Tensor Batching</div>
          </div>

          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">VRAM Allocated</div>
            <div className="text-base font-bold text-purple-400 mt-1">{gpuStats?.vramUsedGB || '34.2'} GB</div>
            <div className="text-[10px] text-gray-500">/ 80.0 GB Total</div>
          </div>

          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">GPU Load</div>
            <div className="text-base font-bold text-green-400 mt-1">{gpuStats?.gpuUtilizationPercent || '88'}%</div>
            <div className="text-[10px] text-gray-500">Dynamic Scaling</div>
          </div>

          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg">
            <div className="text-gray-500 text-[10px] uppercase tracking-wider">CUDA Kernels</div>
            <div className="text-base font-bold text-indigo-400 mt-1">{gpuStats?.cudaKernelsActive || '1024'}</div>
            <div className="text-[10px] text-gray-500">FP16 Matrix Core</div>
          </div>
        </div>
      </div>

      {/* Generator & Code View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Controls */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 space-y-6">
          <div className="border-b border-[#222] pb-3">
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 uppercase tracking-wider">
              <Code className="w-4 h-4 text-indigo-400" /> PYTHON TF SCRIPT GENERATOR
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Generate runnable Python 3.11 scripts with TensorFlow CUDA pipeline wrappers.
            </p>
          </div>

          <form onSubmit={handleGenerateScript} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">AI Engine Task / Workflow</label>
              <textarea
                value={modelTask}
                onChange={(e) => setModelTask(e.target.value)}
                rows={3}
                className="w-full bg-[#080808] border border-[#222] rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Autonomous marketing campaign generation & lead scoring"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">Framework &amp; Acceleration Target</label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full bg-[#080808] border border-[#222] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="TensorFlow 2.16.1 (CUDA 12.2)">TensorFlow 2.16.1 (CUDA 12.2 / FP16)</option>
                <option value="TensorFlow 2.16 + Keras 3 + GPU">TensorFlow 2.16 + Keras 3 Multi-GPU</option>
                <option value="PyTorch 2.3 + CUDA + TensorRT">PyTorch 2.3 + TensorRT Accelerated</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white hover:bg-gray-200 text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Compiling Script...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black text-black" />
                  <span>BUILD PYTHON TF ENGINE</span>
                </>
              )}
            </button>
          </form>

          {/* Setup Instructions */}
          <div className="bg-[#080808] border border-[#222] p-4 rounded-lg space-y-2 font-mono text-xs">
            <span className="text-indigo-400 font-bold flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Quick Start Installation
            </span>
            <div className="p-2.5 bg-[#111] border border-[#222] rounded-md text-gray-300 break-all select-all font-mono text-[11px]">
              {scriptData.installationCommand}
            </div>
            <p className="text-[11px] text-gray-500">
              Run locally or deploy to GCP Cloud Run / Lambda GPU.
            </p>
          </div>
        </div>

        {/* Python Code View */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#222] rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#222] pb-3">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
              <span className="px-2 py-0.5 bg-indigo-900/10 text-indigo-400 rounded border border-indigo-500/20 text-xs">
                {scriptData.filename}
              </span>
              <span className="text-xs text-gray-400 font-normal">Executable Python Backend</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCode}
                className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 text-xs font-mono rounded-lg border border-[#333] flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-indigo-400" /> Copy Code
              </button>
              <button
                onClick={downloadPythonScript}
                className="px-3 py-1.5 bg-white hover:bg-gray-200 text-black text-xs font-mono font-bold rounded-lg shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download .py
              </button>
            </div>
          </div>

          <div className="bg-[#050505] border border-[#222] rounded-lg p-4 overflow-x-auto max-h-[500px] font-mono text-xs text-green-400 leading-relaxed scrollbar-thin">
            <pre>{scriptData.pythonCode}</pre>
          </div>

          <div className="bg-[#080808] border border-[#222] p-3.5 rounded-lg flex items-center justify-between font-mono text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Optimized with Memory Growth &amp; Fast API Routing</span>
            </div>
            <span className="text-gray-500 text-[11px]">Zyvran Python Engine v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
