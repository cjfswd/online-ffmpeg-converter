"use client"
import { AudioTypes, VideoTypes, ImageTypes, AllType } from "@/config/system"
import { FileInputProvider, useFileInput } from "../file-context"
import { InputTest } from "../file-input"
import { Button } from "./button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select"
import { Dispatch, SetStateAction, useState } from "react"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function Selector({ state, handleChange }: { state: AllType | null, handleChange: Dispatch<SetStateAction<AllType | null>> }) {
    const { selectedFile } = useFileInput()
    let extension = selectedFile?.name.split('.').pop()
    return <Select disabled={!selectedFile} value={state as string} onValueChange={handleChange as (value: string) => void}>
        <SelectTrigger className="flex flex-row gap-2">
            <span className={`${!state ? 'text-muted-foreground' : ''}`}>Converter para</span><SelectValue />
        </SelectTrigger>
        <SelectContent>
            {selectedFile?.type.includes('video') && VideoTypes.filter((item) => !item.includes(extension!)).map((item, index) => <SelectItem key={index} value={item}><Badge variant={"red"}>{item}</Badge></SelectItem>)}
            {selectedFile?.type.includes('audio') && AudioTypes.filter((item) => !item.includes(extension!)).map((item, index) => <SelectItem key={index} value={item}><Badge variant={"blue"}>{item}</Badge></SelectItem>)}
            {selectedFile?.type.includes('image') && ImageTypes.filter((item) => !item.includes(extension!)).map((item, index) => <SelectItem key={index} value={item}><Badge variant={"green"}>{item}</Badge></SelectItem>)}
        </SelectContent>
    </Select>
}

export function Default() {
    const [to, changeTo] = useState<AllType | null>(null)
    const { selectedFile, handleFileChange, transcode, convertedFile, setConvertedFile, transcoding } = useFileInput()
    return <>
        <div className="flex w-full flex-row justify-between">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span tabIndex={0} className="w-fit">
                            <Selector {...{
                                state: to, handleChange: (e) => {
                                    if (to != e) setConvertedFile(null)
                                    changeTo(e)
                                }
                            }} />
                        </span>
                    </TooltipTrigger>
                    {!selectedFile && <TooltipContent side={'top'} align={'start'} className="max-w-[160px] sm:max-w-full">
                        <p className="text-orange-500">Faça o upload para selecionar a extensão da conversão.</p>
                    </TooltipContent>}
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span tabIndex={0}>
                            <Button className="bg-slate-800 text-white hover:bg-slate-700" disabled={!selectedFile} onClick={() => {
                                changeTo(null)
                                handleFileChange(null)
                                setConvertedFile(null)
                            }}>Limpar</Button>
                        </span>
                    </TooltipTrigger>
                    {!selectedFile && <TooltipContent side={'top'} align={'end'} className="max-w-[160px] sm:max-w-full">
                        {<p className="text-orange-500">Só é possível limpar o campo de arquivo após realizar um upload.</p>}
                    </TooltipContent>}
                </Tooltip>
            </TooltipProvider>
        </div>
        <InputTest />
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span tabIndex={0}>
                        {/*@ts-ignore*/}
                        <Button className="w-full bg-slate-800 text-white hover:bg-slate-700" disabled={!to || !selectedFile || convertedFile || (transcoding == true || transcoding == "Falha ao converter.")} onClick={async () => transcode(selectedFile!, to!).then().catch()}>Converter</Button>
                    </span>
                </TooltipTrigger>
                {!selectedFile && <TooltipContent side={'bottom'} align={'center'}>
                    <p className="text-orange-500">Faça o upload do arquivo.</p>
                </TooltipContent>}
                {!to && <TooltipContent side={'bottom'} align={'center'} sideOffset={!selectedFile ? 42 : 4}>
                    <p className="text-orange-500">Selecione uma extensão.</p>
                </TooltipContent>}
                {convertedFile && <TooltipContent side={'bottom'} align={'center'}>
                    <p className="text-orange-500">A conversão para &apos;{to}&apos; já foi realizada, para realizar uma nova conversão faça um novo upload de arquivo ou atualize extensão final.</p>
                </TooltipContent>}
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span tabIndex={0}>
                        <a href={convertedFile || ''} download={`output${to}`} className={cn(buttonVariants(), `w-full bg-slate-800 text-white hover:bg-slate-700 ${convertedFile ? '' : 'pointer-events-none opacity-50'}`)}>
                            Download
                        </a>
                    </span>
                </TooltipTrigger>
                {!selectedFile && <TooltipContent side={'bottom'} align={'center'}>
                    <p className="text-orange-500">Faça o upload do arquivo.</p>
                </TooltipContent>}
                {!to && <TooltipContent side={'bottom'} align={'center'} sideOffset={!selectedFile ? 42 : 4}>
                    <p className="text-orange-500">Selecione uma extensão.</p>
                </TooltipContent>}
                {!convertedFile && <TooltipContent side={'bottom'} align={'center'} sideOffset={!selectedFile ? 82 : to ? 4 : 42}>
                    <p className="text-orange-500">Converta o arquivo.</p>
                </TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    </>
}