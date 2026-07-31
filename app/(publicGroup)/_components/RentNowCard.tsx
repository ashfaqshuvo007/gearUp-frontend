"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn, verifyToken } from "@/lib/utils";
import {
  format,
  differenceInCalendarDays,
  isBefore,
  startOfDay,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { createRentalOrder } from "../_actions/createRentalOrder";

export const RentNowCard = ({
  orderItemId,
  pricePerDay,
  unavailableDates = [],
  onRentRequest,
}: {
  orderItemId: string;
  pricePerDay: number;
  unavailableDates?: Date[];
  /** Called with parsed dates + computed totals once the form action has run. */
  onRentRequest?: (details: {
    from: Date;
    to: Date;
    days: number;
    total: number;
  }) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return differenceInCalendarDays(range.to, range.from) + 1;
  }, [range]);

  const total = days * pricePerDay;

  const today = startOfDay(new Date());

  const isDisabledDate = (date: Date) => {
    if (isBefore(date, today)) return true;
    return unavailableDates.some(
      (unavailable) =>
        startOfDay(unavailable).getTime() === startOfDay(date).getTime()
    );
  };

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);
    setError(null);
    if (selected?.from && selected?.to) {
      setOpen(false);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold">
            BDT {pricePerDay.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/ day</span>
        </div>
      </CardHeader>

      <form action={createRentalOrder}>
        {/* Hidden inputs mirror the date range into the form's FormData,
            since the Calendar/Popover UI manages selection via React state
            rather than native form controls. */}
        <input
          type="hidden"
          name="from"
          value={range?.from ? range.from.toISOString() : ""}
        />
        <input
          type="hidden"
          name="to"
          value={range?.to ? range.to.toISOString() : ""}
        />
        <input type="hidden" name="days" value={days || ""} />
        <input type="hidden" name="total" value={total || ""} />
        <input type="hidden" name="orderItemId" value={orderItemId} />
        <input type="hidden" name="price" value={pricePerDay || ""} />

        <CardContent className="space-y-4 mb-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !range?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {range?.from ? (
                  range.to ? (
                    <>
                      {format(range.from, "LLL d, y")} –{" "}
                      {format(range.to, "LLL d, y")}
                    </>
                  ) : (
                    format(range.from, "LLL d, y")
                  )
                ) : (
                  "Select rental dates"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={range}
                onSelect={handleSelect}
                disabled={isDisabledDate}
                numberOfMonths={2}
                defaultMonth={range?.from ?? today}
              />
            </PopoverContent>
          </Popover>

          {days > 0 && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  BDT {pricePerDay.toLocaleString()} × {days}{" "}
                  {days === 1 ? "day" : "days"}
                </span>
                <span>BDT {total.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>BDT {total.toLocaleString()}</span>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!range?.from || !range?.to || pending}
          >
            {pending ? "Submitting…" : "Rent Now"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};