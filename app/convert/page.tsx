import { InputTest } from "@/components/file-input"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VideoTypes, AudioTypes, ImageTypes } from "@/config/system"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileInputProvider } from "@/components/file-context"
import { Default } from "@/components/ui/converter"

type CardProps = React.ComponentProps<typeof Card>

const Compatibility = () => {
  return (
    <>
      <TypeSection types={VideoTypes as unknown as string[]} variant="red" />
      <TypeSection types={AudioTypes as unknown as string[]} variant="blue" />
      <TypeSection types={ImageTypes as unknown as string[]} variant="green" />
    </>
  );
};

const TypeSection = ({ types, variant }: { types: Array<string>, variant: 'red' | 'blue' | 'green' }) => (
  <>
    {types.map((item, index) => (
      <Badge key={index} className="h-fit w-fit" variant={variant}>
        {item}
      </Badge>
    ))}
  </>
);

function CardDemo({ className, text: { title, price, timming, list, signature }, ...props }: CardProps & { text: { title: string, price: string, timming: string, list: string[], signature: string } }) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="p-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 px-4">
        <div className="flex flex-col items-center justify-center rounded-md border p-3">
          <div className="flex items-center justify-center">
            <div className="text-2xl font-bold sm:text-4xl">{price} R$</div>
            <div className="mt-2 text-xs text-muted-foreground sm:text-base">{timming}</div>
          </div>
        </div>
        <div>
          {list.map((item, index) => (
            <div
              key={index}
              className="mb-2 grid grid-cols-[15px_1fr] items-start last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto px-3 pb-3">
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" />{signature}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function IndexPage() {
  return (
    <div className="container grid items-center gap-6 pb-8 [&>section]:pt-16 md:[&>section]:pt-32 [&~section:first-of-type]:pt-8">
      <div className="mt-10 flex flex-col gap-2 text-center">
        <FileInputProvider>
          <Default />
        </FileInputProvider>

      </div>


    </div>
  )
}
