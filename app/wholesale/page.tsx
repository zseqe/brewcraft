"use client";

import { useState } from "react";
import { Truck, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";

// The unified catalog pulling from your Telemetry lots
const coffeeCatalog = [
    { id: "LOT-ETH-904", name: "Yirgacheffe Gedeb G1", origin: "Ethiopia", basePrice: 14.50 },
    { id: "LOT-COL-412", name: "Huila Pink Bourbon Micro-Lot", origin: "Colombia", basePrice: 16.80 },
    { id: "LOT-PAN-777", name: "Hacienda La Esmeralda Geisha", origin: "Panama", basePrice: 42.00 },
    { id: "LOT-KEN-102", name: "Nyeri Hill Estate AA", origin: "Kenya", basePrice: 15.20 },
    { id: "LOT-IDN-404", name: "Sumatra Wahana Estate", origin: "Indonesia", basePrice: 13.50 }
];

export default function WholesalePage() {
    const [bagCount, setBagCount] = useState<number>(10);
    const [selectedLot, setSelectedLot] = useState(coffeeCatalog[0]);
    const [allocationSubmitted, setAllocationSubmitted] = useState<boolean>(false);

    // Wholesale Calculations (Standard 60kg bags)
    const totalWeightKg = bagCount * 60;

    // Dynamic Tiered Pricing based on the selected lot
    const tier1Price = selectedLot.basePrice;
    const tier2Price = selectedLot.basePrice * 0.88; // ~12% discount
    const tier3Price = selectedLot.basePrice * 0.77; // ~23% discount

    let activePricePerKg = tier1Price;
    if (bagCount >= 30) activePricePerKg = tier3Price;
    else if (bagCount >= 10) activePricePerKg = tier2Price;

    const grossEstimate = totalWeightKg * activePricePerKg;
    const estimatedPallets = Math.ceil(bagCount / 10);

    return (
        <div className="min-h-screen text-white pt-28 pb-20 px-6 relative z-10">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <header className="border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 text-[#d97706] text-xs font-mono tracking-widest uppercase mb-3">
                        <Truck size={16} />
                        <span>Enterprise B2B Green Logistics</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        Commercial Allocations & Green Coffee
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-3xl mt-3 font-normal">
                        Direct-trade ocean container freight and spot warehouse allocations. Packaged in certified 60kg GrainPro hermetic liners with full traceability lot manifests.
                    </p>
                </header>

                {/* Dynamic Pricing Matrix */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tier 1 */}
                    <div
                        onClick={() => setBagCount(5)}
                        className={`p-6 rounded-2xl border transition cursor-pointer ${bagCount < 10
                                ? "bg-[#d97706]/10 border-[#d97706]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                    >
                        <span className={`text-xs font-mono uppercase block font-semibold ${bagCount < 10 ? "text-[#d97706]" : "text-gray-500"}`}>
                            Tier 1: Spot Micro-Lot
                        </span>
                        <div className="text-2xl font-bold font-mono text-white mt-2">
                            ${tier1Price.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ kg</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">1 to 9 Bags (60 - 540 kg). Instant pallet dispatch from regional warehouse.</p>
                    </div>

                    {/* Tier 2 */}
                    <div
                        onClick={() => setBagCount(15)}
                        className={`p-6 rounded-2xl border transition cursor-pointer ${bagCount >= 10 && bagCount < 30
                                ? "bg-[#d97706]/10 border-[#d97706]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                    >
                        <span className={`text-xs font-mono uppercase block font-semibold ${bagCount >= 10 && bagCount < 30 ? "text-[#d97706]" : "text-gray-500"}`}>
                            Tier 2: Commercial Multi-Pallet
                        </span>
                        <div className="text-2xl font-bold font-mono text-white mt-2">
                            ${tier2Price.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ kg</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">10 to 29 Bags (600 - 1,740 kg). Consolidated LTL freight included.</p>
                    </div>

                    {/* Tier 3 */}
                    <div
                        onClick={() => setBagCount(30)}
                        className={`p-6 rounded-2xl border transition cursor-pointer ${bagCount >= 30
                                ? "bg-[#d97706]/10 border-[#d97706]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                    >
                        <span className={`text-xs font-mono uppercase block font-semibold ${bagCount >= 30 ? "text-[#d97706]" : "text-gray-500"}`}>
                            Tier 3: Full Container Load (FCL)
                        </span>
                        <div className="text-2xl font-bold font-mono text-white mt-2">
                            ${tier3Price.toFixed(2)} <span className="text-xs font-normal text-gray-400">/ kg</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">30+ Bags (1,800+ kg). Direct port-to-roastery forward contracts.</p>
                    </div>
                </section>

                {/* Real-time Order Modeler */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-8">

                        {/* Catalog Selector */}
                        <div className="space-y-4 pb-8 border-b border-white/10">
                            <label className="text-xs font-mono text-gray-400 uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                                Select Origin / Lot
                            </label>
                            <select
                                value={selectedLot.id}
                                onChange={(e) => {
                                    const lot = coffeeCatalog.find(c => c.id === e.target.value);
                                    if (lot) setSelectedLot(lot);
                                }}
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-bold focus:outline-none focus:border-[#d97706] appearance-none cursor-pointer"
                            >
                                {coffeeCatalog.map((coffee) => (
                                    <option key={coffee.id} value={coffee.id} className="bg-neutral-900 text-white">
                                        {coffee.id} — {coffee.name} ({coffee.origin})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3 text-[#d97706] text-xs font-mono uppercase tracking-wider">
                            <Calculator size={16} />
                            <span>Volume & Logistics Modeler</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-mono">
                                <span className="text-gray-300">Required 60kg GrainPro Bags:</span>
                                <span className="text-xl font-bold text-[#d97706]">{bagCount} Bags</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="1"
                                value={bagCount}
                                onChange={(e) => setBagCount(parseInt(e.target.value))}
                                className="w-full accent-[#d97706] bg-neutral-800 rounded-lg cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>1 Bag (Spot)</span>
                                <span>25 Bags</span>
                                <span>50 Bags (Full Freight)</span>
                            </div>
                        </div>

                        {/* Spec Breakdown */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
                            <div>
                                <span className="text-gray-500 block">Total Net Mass</span>
                                <span className="text-white text-sm font-bold mt-1 block">{totalWeightKg.toLocaleString()} kg</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Active Rate</span>
                                <span className="text-white text-sm font-bold mt-1 block">${activePricePerKg.toFixed(2)} / kg</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Estimated Pallets</span>
                                <span className="text-white text-sm font-bold mt-1 block">{estimatedPallets} Pallets</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Contract Total</span>
                                <span className="text-[#d97706] text-sm font-bold mt-1 block">${grossEstimate.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Allocation Request Form */}
                    <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                        {allocationSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                                <CheckCircle2 size={48} className="text-[#d97706]" />
                                <h3 className="text-xl font-bold text-white">Allocation Logged</h3>
                                <p className="text-xs font-mono text-gray-400 max-w-xs">
                                    Your request for {bagCount} bags of {selectedLot.name} has been assigned reference ID <span className="text-white">RFQ-2026-X8</span>. Our logistics desk will transmit cupping manifests within 4 hours.
                                </p>
                                <button
                                    onClick={() => setAllocationSubmitted(false)}
                                    className="text-xs font-mono text-[#d97706] underline mt-4"
                                >
                                    Configure Another Run
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setAllocationSubmitted(true);
                                }}
                                className="space-y-4"
                            >
                                <div className="border-b border-white/10 pb-3">
                                    <h3 className="text-sm font-mono uppercase tracking-wider text-white">Request Allocation Lock</h3>
                                    <p className="text-xs text-gray-500">Lock {selectedLot.id} pricing for 72 hours.</p>
                                </div>

                                <div>
                                    <label className="text-xs font-mono text-gray-400 block mb-1">Company / Roastery Legal Name</label>
                                    <input
                                        required
                                        placeholder="North Star Roasting Co."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d97706]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-mono text-gray-400 block mb-1">Commercial Receiving Country / Port</label>
                                    <input
                                        required
                                        placeholder="Rotterdam, Netherlands (Port NL-RTM)"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d97706]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-mono text-gray-400 block mb-1">Corporate Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="logistics@company.com"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d97706]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-2 py-3 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm tracking-wide transition shadow-lg shadow-[#d97706]/20 flex items-center justify-center gap-2"
                                >
                                    <span>Submit Manifest RFQ</span>
                                    <ArrowRight size={16} />
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}