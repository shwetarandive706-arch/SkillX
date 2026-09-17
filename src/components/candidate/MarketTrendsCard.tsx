'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_MARKET_TRENDS } from '@/lib/data/mockMarketTrends';
import { TrendingUp, Sparkles, BookOpen, DollarSign, Info, ShieldCheck } from 'lucide-react';

interface MarketTrendsCardProps {
  roleTitle: string;
}

export const MarketTrendsCard: React.FC<MarketTrendsCardProps> = ({ roleTitle }) => {
  const insight = DEMO_MARKET_TRENDS[roleTitle] || DEMO_MARKET_TRENDS['Full Stack Developer'];

  return (
    <Card className="border-indigo-500/30 bg-card/90 space-y-4 p-6">
      <CardHeader className="p-0 border-b border-border/60 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                {insight.roleTitle} Market Insights
              </CardTitle>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Industry demand & skill evolution benchmarks
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="gold" className="text-[10px] flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {insight.demandIndicator}
            </Badge>
            <Badge variant="demo" className="text-[9px]">
              DEMO MARKET DATA
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-4 text-xs">
        {/* Growth Outlook Box */}
        <div className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-slate-200 space-y-1">
          <div className="flex items-center justify-between text-indigo-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-indigo-400" />
              Career Growth Outlook:
            </span>
            <span className="font-mono text-emerald-400 flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {insight.salaryRange}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {insight.growthOutlook}
          </p>
        </div>

        {/* Primary Skills & Emerging Next-Gen Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <span className="font-semibold text-slate-300 block mb-2 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              Core In-Demand Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {insight.importantSkills.map((sk) => (
                <Badge key={sk} variant="outline" className="text-[10px] border-blue-500/30 text-blue-300">
                  {sk}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="font-semibold text-slate-300 block mb-2 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Emerging Next-Gen Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {insight.emergingSkills.map((sk) => (
                <Badge key={sk} variant="outline" className="text-[10px] border-purple-500/30 text-purple-300">
                  {sk}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Related Learning Topics */}
        <div className="pt-2 border-t border-border/50 space-y-2">
          <span className="font-semibold text-slate-300 block flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
            Recommended Curriculum Focus Topics:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
            {insight.learningTopics.map((topic, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-secondary/20 px-2.5 py-1.5 rounded-lg border border-border/60">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Source Disclaimer */}
        <p className="text-[10px] text-muted-foreground italic pt-1 border-t border-border/40">
          * Note: Displayed figures are illustrative demo industry benchmarks for prototype exploration. SkillX does not present live market API feeds without explicit data source integration.
        </p>
      </CardContent>
    </Card>
  );
};
