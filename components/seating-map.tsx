"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SeatStatus = "available" | "occupied" | "selected";

interface Seat {
  id: string;
  status: SeatStatus;
  row: number;
  number: number;
}

const generateInitialSeats = () => {
  const initialSeats: Seat[] = [];
  const rows = 10;
  const seatsPerRow = 20;

  for (let row = 1; row <= rows; row++) {
    for (let num = 1; num <= seatsPerRow; num++) {
      initialSeats.push({
        id: `${row}-${num}`,
        status: "available",
        row,
        number: num,
      });
    }
  }
  return initialSeats;
};

export default function SeatingMap() {
  const [seats, setSeats] = useState<Seat[]>(generateInitialSeats);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate random occupancy after initial render
    setSeats(prev => 
      prev.map(seat => ({
        ...seat,
        status: Math.random() > 0.3 ? "occupied" : "available"
      }))
    );
  }, []);

  if (!isClient) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] p-4">
          <div className="mb-8 w-full bg-secondary p-2 text-center rounded-md">
            Stage
          </div>
          <div className="grid grid-cols-20 gap-1">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className="w-8 h-8 rounded-t-lg cursor-pointer transition-colors bg-secondary"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] p-4">
        <div className="mb-8 w-full bg-secondary p-2 text-center rounded-md">
          Stage
        </div>
        <div className="grid grid-cols-20 gap-1">
          {seats.map((seat) => (
            <TooltipProvider key={seat.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-t-lg cursor-pointer transition-colors",
                      {
                        "bg-green-500 hover:bg-green-600":
                          seat.status === "available",
                        "bg-red-500": seat.status === "occupied",
                        "bg-blue-500": seat.status === "selected",
                      }
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Row {seat.row}, Seat {seat.number}
                    <br />
                    Status: {seat.status}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}