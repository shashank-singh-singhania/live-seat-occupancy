"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { time: "09:00", occupancy: 20 },
  { time: "10:00", occupancy: 45 },
  { time: "11:00", occupancy: 75 },
  { time: "12:00", occupancy: 85 },
  { time: "13:00", occupancy: 90 },
  { time: "14:00", occupancy: 82 },
  { time: "15:00", occupancy: 71 },
  { time: "16:00", occupancy: 65 },
];

export default function OccupancyChart() {
  return (
    <Card className="p-4">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="occupancy"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}