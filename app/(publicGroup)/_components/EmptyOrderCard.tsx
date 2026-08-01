"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const EmptyOrderCard = () => {
  return (
    <div>
        <Card className="@container/card">
        <CardContent>
        <div className="line-clamp-1 flex gap-2 font-medium">
            You are not logged in. 
          </div>
          <div className="text-blue-300 text-2xl">
            Customers need to Register/Login to rent gears.
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center gap-1.5 text-sm">
          <Link href={"/login"} >
                   <Button variant="default" size="lg" className="cursor-pointer px-8">
                        Login
                   </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EmptyOrderCard