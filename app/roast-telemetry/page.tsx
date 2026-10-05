"use client";

import { useState } from "react";
import { Activity, Sliders } from "lucide-react";
import { motion } from "framer-motion";

interface BatchTelemetry {
  id: string;
  lotName: string;
  origin: string;
  elevation: string;
  moisture: string;
  waterActivity: string;
  chargeTemp: string;
  firstCrack: string;
  dropTemp: string;
  dtr: string;
  curveBT: string;
  curveRoR: string;
}

// Added unique thermodynamic path data for each lot
const activeBatches: BatchTelemetry[] = [
  {
    id: "LOT-ETH-904",
    lotName: "Yirgacheffe Gedeb G1",
    origin: "Gedeb, Gedeo Zone, Ethiopia",
    elevation: "2,050 MASL",
    moisture: "10.8%",
    waterActivity: "0.54 aw",
    chargeTemp: "202°C",
    firstCrack: "08:42 @ 196°C",
    dropTemp: "211°C",
    dtr: "15.4%",
    curveBT: "M 10 180 Q 120 210, 200 150 T 400 70 T 580 45",
    curveRoR: "M 10 40 Q 100 120, 240 140 T 450 175 T 580 185",
  },
  {
    id: "LOT-COL-412",
    lotName: "Huila Pink Bourbon Micro-Lot",
    origin: "San Adolfo, Huila, Colombia",
    elevation: "1,820 MASL",
    moisture: "11.1%",
    waterActivity: "0.56 aw",
    chargeTemp: "198°C",
    firstCrack: "09:10 @ 198°C",
    dropTemp: "213°C",
    dtr: "16.2%",
    curveBT: "M 10 190 Q 110 200, 210 140 T 390 60 T 580 40",
    curveRoR: "M 10 30 Q 110 110, 220 150 T 460 160 T 580 190",
  },
  {
    id: "LOT-PAN-777",
    lotName: "Hacienda La Esmeralda Geisha",
    origin: "Boquete, Panama",
    elevation: "1,700 MASL",
    moisture: "11.5%",
    waterActivity: "0.58 aw",
    chargeTemp: "195°C",
    firstCrack: "09:45 @ 194°C",
    dropTemp: "206°C",
    dtr: "12.8%",
    curveBT: "M 10 170 Q 130 220, 190 130 T 410 80 T 580 50",
    curveRoR: "M 10 50 Q 90 130, 250 130 T 440 180 T 580 170",
  },
  {
    id: "LOT-KEN-102",
    lotName: "Nyeri Hill Estate AA",
    origin: "Nyeri, Kenya",
    elevation: "1,950 MASL",
    moisture: "10.2%",
    waterActivity: "0.52 aw",
    chargeTemp: "205°C",
    firstCrack: "08:30 @ 199°C",
    dropTemp: "210°C",
    dtr: "14.5%",
    curveBT: "M 10 185 Q 115 215, 205 145 T 395 75 T 580 35",
    curveRoR: "M 10 35 Q 105 125, 230 145 T 455 170 T 580 180",
  },
  {
    id: "LOT-IDN-404",
    lotName: "Sumatra Wahana Estate",
    origin: "Sidikalang, Indonesia",
    elevation: "1,300 MASL",
    moisture: "12.1%",
    waterActivity: "0.61 aw",
    chargeTemp: "200°C",
    firstCrack: "09:20 @ 197°C",
    dropTemp: "216°C",
    dtr: "18.0%",
    curveBT: "M 10 175 Q 125 205, 195 155 T 405 65 T 580 55",
    curveRoR: "M 10 45 Q 95 115, 245 135 T 445 185 T 580 175",
  }
];

export default function RoastTelemetryPage() {
  const [selectedBatch, setSelectedBatch] = useState<BatchTelemetry>(activeBatches[0]);

  const [dose, setDose] = useState<number>(18);
  const [water, setWater] = useState<number>(300);
  const [tds, setTds] = useState<number>(1.35);

  const extractionYield = dose > 0 ? ((tds * water) / dose).toFixed(2) : "0.00";
  const brewRatio = dose > 0 ? (water / dose).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen text-white pt-28 pb-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-[#d97706] text-xs font-mono tracking-widest uppercase mb-3">
            <Activity size={16} />
            <span>Industrial Telemetry & Agronomy Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Roast Profile & Extraction Telemetry
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mt-3 font-normal">
            Real-time heat delta metrics, moisture activity indices, and thermodynamic Rate of Rise (RoR) curves logged across dual-probe drum sensors.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Batch Archive</span>
                <span className="text-xs font-mono text-[#d97706]">2 Probes Online</span>
              </div>
              <div className="space-y-3">
                {activeBatches.map((batch) => (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={`w-full text-left p-4 rounded-xl border transition cursor-pointer ${
                      selectedBatch.id === batch.id
                        ? "bg-[#d97706]/10 border-[#d97706] text-white"
                        : "bg-white/[0.01] border-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xs font-mono text-[#d97706]">{batch.id}</div>
                    <div className="text-base font-bold text-white mt-1">{batch.lotName}</div>
                    <div className="text-xs text-gray-500 mt-1">{batch.origin}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">Elevation</span>
                <span className="text-gray-200">{selectedBatch.elevation}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Moisture</span>
                <span className="text-gray-200">{selectedBatch.moisture}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Water Activity</span>
                <span className="text-gray-200">{selectedBatch.waterActivity}</span>
              </div>
              <div>
                <span className="text-gray-500 block">DTR Ratio</span>
                <span className="text-[#d97706] font-bold">{selectedBatch.dtr}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-white">Thermodynamic Curve (BT / ET / RoR)</h3>
                <p className="text-xs text-gray-500 font-mono">Charge: {selectedBatch.chargeTemp} | First Crack: {selectedBatch.firstCrack} | Drop: {selectedBatch.dropTemp}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#d97706]">
                  <span className="w-2.5 h-0.5 bg-[#d97706] inline-block" /> Bean Temp (BT)
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span className="w-2.5 h-0.5 bg-gray-500 inline-block" /> RoR (°C/min)
                </span>
              </div>
            </div>

            <div className="w-full h-64 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 220" preserveAspectRatio="none">
                <line x1="0" y1="200" x2="600" y2="200" stroke="#333333" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#222222" strokeDasharray="4 4" />
                <line x1="0" y1="40" x2="600" y2="40" stroke="#222222" strokeDasharray="4 4" />

                {/* Animated Bean Temperature Curve */}
                <motion.path
                  animate={{ d: selectedBatch.curveBT }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                />

                {/* Animated Rate of Rise Curve */}
                <motion.path
                  animate={{ d: selectedBatch.curveRoR }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-gray-500 pt-4 border-t border-white/5">
              <span>00:00 (Charge)</span>
              <span>03:00 (Dry End)</span>
              <span>06:00 (Maillard)</span>
              <span>08:45 (FC)</span>
              <span>10:30 (Drop)</span>
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 text-[#d97706] text-xs font-mono uppercase tracking-wider mb-2">
            <Sliders size={16} />
            <span>SCA Universal Extraction Modeler</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
            Solvent Yield & Total Dissolved Solids Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <label className="text-xs font-mono text-gray-400 uppercase flex justify-between">
                <span>Dose Weight</span>
                <span className="text-[#d97706]">{dose} g</span>
              </label>
              <input
                type="range"
                min="10"
                max="40"
                step="0.5"
                value={dose}
                onChange={(e) => setDose(parseFloat(e.target.value))}
                className="w-full accent-[#d97706] bg-neutral-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs text-gray-500">Fine/Coarse ground dry bed input.</span>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-gray-400 uppercase flex justify-between">
                <span>Water Volume</span>
                <span className="text-[#d97706]">{water} ml</span>
              </label>
              <input
                type="range"
                min="150"
                max="600"
                step="10"
                value={water}
                onChange={(e) => setWater(parseFloat(e.target.value))}
                className="w-full accent-[#d97706] bg-neutral-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs text-gray-500">Filtered solvent @ 93.5°C brew target.</span>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-gray-400 uppercase flex justify-between">
                <span>Target TDS Reading</span>
                <span className="text-[#d97706]">{tds}%</span>
              </label>
              <input
                type="range"
                min="1.00"
                max="2.00"
                step="0.05"
                value={tds}
                onChange={(e) => setTds(parseFloat(e.target.value))}
                className="w-full accent-[#d97706] bg-neutral-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs text-gray-500">Digital refractometer optic reading.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-gray-500 uppercase block">Brew Ratio</span>
              <span className="text-2xl font-mono font-bold text-white mt-1">1:{brewRatio}</span>
              <span className="text-xs text-gray-500 block mt-1">Solute to solvent target</span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-gray-500 uppercase block">Extraction Yield</span>
              <span className="text-2xl font-mono font-bold text-[#d97706] mt-1">{extractionYield}%</span>
              <span className="text-xs text-gray-500 block mt-1">
                {parseFloat(extractionYield) >= 18 && parseFloat(extractionYield) <= 22
                  ? "Ideal SCA Target (18-22%)"
                  : parseFloat(extractionYield) < 18
                  ? "Under-extracted (Acidic/Thin)"
                  : "Over-extracted (Astringent/Dry)"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-gray-500 uppercase block">Total Liquid Yield</span>
              <span className="text-2xl font-mono font-bold text-white mt-1">{Math.round(water - dose * 2)} g</span>
              <span className="text-xs text-gray-500 block mt-1">Calculated after bed retention</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}