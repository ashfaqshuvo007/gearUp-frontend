"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format, differenceInCalendarDays, isBefore, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { PopoverContent } from "radix-ui/popover";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

export const RentNowCard = ({
  pricePerDay,
  unavailableDates = [],
  onRentRequest,
}: {
  pricePerDay: number;
  unavailableDates?: Date[];
  onRentRequest?: (range: { from: Date; to: Date }) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const days = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return differenceInCalendarDays(range.to, range.from) + 1;
  }, [range]);

  const total = days * pricePerDay;

  const today = startOfDay(new Date());

  const isDisabledDate = (date: Date) => {
    if (isBefore(date, today)) return true;
    return unavailableDates.some(
      (unavailable) => startOfDay(unavailable).getTime() === startOfDay(date).getTime()
    );
  };

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);
    if (selected?.from && selected?.to) {
      setOpen(false);
    }
  };

  const handleSubmit = () => {
    if (range?.from && range?.to) {
      onRentRequest?.({ from: range.from, to: range.to });
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

      <CardContent className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
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
                    {format(range.from, "LLL d, y")} – {format(range.to, "LLL d, y")}
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
                BDT {pricePerDay.toLocaleString()} × {days} {days === 1 ? "day" : "days"}
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
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          disabled={!range?.from || !range?.to}
          onClick={handleSubmit}
        >
          Rent Now
        </Button>
      </CardFooter>
    </Card>
  );
}