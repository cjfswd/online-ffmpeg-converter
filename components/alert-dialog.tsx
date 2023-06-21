import { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";

export function AlertDialogDemo(props: AlertDialogProps & { message: string }) {
    const [open, setOpen] = React.useState(props.open);

    return (
        <Dialog {...{ ...props, open }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-600">Erro</DialogTitle>
                    <DialogDescription className="text-red-400">
                        {props.message}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
