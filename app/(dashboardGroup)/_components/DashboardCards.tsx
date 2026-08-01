"use client"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const DashboardCards = () => {
  return (
    <div>
        <div className="grid grid-cols-2 gap-4 px-4 mt-4">
            <Card className="@container/card">
                <CardHeader>
                <CardDescription>Ongoing Rentals</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    BDT 1,250.00
                </CardTitle>
                <CardAction>
                </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                   Orders this month 
                </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                <CardDescription>Total Orders</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    BDT 1,23400
                </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">
                    Rentals needs attention
                </div>
                </CardFooter>
            </Card>
       </div>
    </div>
  )
}

export default DashboardCards