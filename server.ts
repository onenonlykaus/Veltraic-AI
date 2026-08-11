import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client lazily or safely
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Gemini API features will run with fallback response or error.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "dummy-key",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    brand: "Veltraic AI Engine",
    architecture: "Python 3.11 + TensorFlow 2.16 + CUDA Cloud GPU Acceleration",
    version: "1.0.0",
    uniqueNameConfirmed: true,
  });
});

// Live GPU Engine Stats API (Simulated High-Speed TensorFlow GPU Cluster Metrics)
app.get("/api/gpu-stats", (_req, res) => {
  const now = Date.now();
  const baseTps = 148;
  const variation = Math.floor(Math.sin(now / 2000) * 12);
  const latency = (14 + Math.sin(now / 1500) * 3).toFixed(1);

  res.json({
    gpuName: "NVIDIA H100 SXM5 80GB (Cloud Cluster)",
    vramUsedGB: (34.2 + Math.sin(now / 3000) * 1.5).toFixed(1),
    vramTotalGB: 80,
    gpuUtilizationPercent: Math.min(99, Math.max(72, 88 + variation)),
    cudaKernelsActive: 1024,
    tokensPerSecond: baseTps + variation,
    inferenceLatencyMs: parseFloat(latency),
    tensorFlowVersion: "2.16.1",
    pythonRuntime: "Python 3.11.8 CPython",
    batchSize: 32,
    quantization: "FP16 / INT8 Mixed Precision",
    activeAgents: 14,
  });
});

// Campaign Generator Endpoint (Real Gemini API)
app.post("/api/gemini/campaign", async (req, res) => {
  try {
    const { brandName, businessCategory, targetAudience, goal, budget } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: "GEMINI_API_KEY is missing in backend environment.",
      });
    }

    const ai = getGenAI();

    const prompt = `You are Veltraic AI Engine - the world's fastest, highest-efficiency autonomous AI marketing and business co-founder.
    Generate a complete, high-converting growth strategy & marketing system for:
    - Brand/Company: "${brandName || "My AI Business"}"
    - Category/Niche: "${businessCategory || "AI Marketing & Automation"}"
    - Target Audience: "${targetAudience || "Small Businesses & Solopreneurs"}"
    - Primary Goal: "${goal || "Get 100 paying subscribers in 30 days"}"
    - Monthly Budget: "${budget || "$100/mo"}"

    Respond strictly in JSON format matching the schema provided. Make the output actionable, viral, high-converting, and detailed!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Veltraic AI Engine, an autonomous AI business system built for young founders and modern companies. You generate high-converting campaigns, content calendars, lead nurturing workflows, and growth systems.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandHeadline: { type: Type.STRING },
            positioningStatement: { type: Type.STRING },
            growth30DayPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.NUMBER },
                  phaseName: { type: Type.STRING },
                  actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["week", "phaseName", "actionItems"],
              },
            },
            channels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  strategy: { type: Type.STRING },
                  samplePost: { type: Type.STRING },
                  postFrequency: { type: Type.STRING },
                },
                required: ["platform", "strategy", "samplePost", "postFrequency"],
              },
            },
            leadMagnetFunnel: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                hookCopy: { type: Type.STRING },
                emailSequence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      day: { type: Type.NUMBER },
                      subject: { type: Type.STRING },
                      previewText: { type: Type.STRING },
                      bodySnippet: { type: Type.STRING },
                    },
                    required: ["day", "subject", "previewText", "bodySnippet"],
                  },
                },
              },
              required: ["title", "hookCopy", "emailSequence"],
            },
            viralHookIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            estimatedMonthlyRevenueUSD: { type: Type.NUMBER },
          },
          required: [
            "brandHeadline",
            "positioningStatement",
            "growth30DayPlan",
            "channels",
            "leadMagnetFunnel",
            "viralHookIdeas",
            "estimatedMonthlyRevenueUSD",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json({ success: true, campaign: data });
  } catch (error: any) {
    console.error("Error generating campaign:", error);
    res.status(500).json({
      error: error.message || "Failed to generate AI campaign.",
    });
  }
});

// Co-Pilot Chat Endpoint (Real Gemini API)
app.post("/api/gemini/copilot", async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: "GEMINI_API_KEY is missing." });
    }

    const ai = getGenAI();

    const formattedHistory = (messages || []).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessage = formattedHistory.pop()?.parts[0]?.text || "Hello";

    const systemInstruction = `You are Veltraic Copilot, an elite AI Startup Co-Founder mentor created specifically for teenage entrepreneurs, young creators, and ambitious business builders (age 14+).
    You speak with high energy, clarity, smart strategic advice, and practical, direct steps.
    Help them validate ideas, find clients, write outreach messages, design landing pages, choose pricing model ($29-$299/mo subscriptions), and run Python/TensorFlow GPU AI systems.
    Context about the user: ${JSON.stringify(userContext || {})}. Keep answers structured with crisp bullet points, code snippets if relevant, and high-impact guidance.`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
      },
    });

    const response = await chat.sendMessage({ message: lastMessage });
    res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error("Copilot Error:", error);
    res.status(500).json({ error: error.message || "Copilot failed to respond." });
  }
});

// Python Architecture Code Generator Endpoint
app.post("/api/gemini/python-architecture", async (req, res) => {
  try {
    const { modelTask, framework } = req.body;
    const ai = getGenAI();

    const prompt = `Write a production-ready Python 3.11 script using ${framework || "TensorFlow 2.16"} for a high-performance AI Engine performing "${modelTask || "Real-time AI Marketing Copy & Lead Scoring"}".
    It must demonstrate:
    1. CUDA / GPU acceleration setup with tf.config.experimental.set_memory_growth.
    2. Model build / dataset batching pipeline with tf.data.Dataset for ultra-fast throughput.
    3. Low-latency inference wrapper function with batching.
    4. FastAPI server endpoint wrapper (/predict).
    5. Clean, executable Python code with informative comments.

    Return JSON with fields:
    - filename: string (e.g. "zyvran_engine_core.py")
    - pythonCode: string
    - installationCommand: string
    - performanceBreakdown: object with throughput, latency, gpuMemMB.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            filename: { type: Type.STRING },
            pythonCode: { type: Type.STRING },
            installationCommand: { type: Type.STRING },
            performanceBreakdown: {
              type: Type.OBJECT,
              properties: {
                throughputTokensPerSec: { type: Type.NUMBER },
                latencyMs: { type: Type.NUMBER },
                gpuMemMB: { type: Type.NUMBER },
              },
              required: ["throughputTokensPerSec", "latencyMs", "gpuMemMB"],
            },
          },
          required: ["filename", "pythonCode", "installationCommand", "performanceBreakdown"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, scriptData: data });
  } catch (error: any) {
    console.error("Python architecture error:", error);
    res.status(500).json({ error: error.message || "Failed to generate Python code." });
  }
});

// Vite middleware for dev / static serving for prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zyvran AI Engine Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
