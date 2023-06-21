import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="supports-backdrop-blur:bg-background/60 z-40 w-full border-t bg-background/95 backdrop-blur">
            <div className="container flex min-h-[4rem] flex-col items-center justify-center gap-1 text-xs text-muted-foreground sm:flex-row">
               <div>Built by&nbsp;<Link href={"https://github.com/cjfswd/"} className="underline" target="_blank" referrerPolicy="no-referrer">cjfswd</Link>.</div><div>Source code available on&nbsp;<Link href={"https://github.com/cjfswd/online-ffmpeg-converter"} className="underline" target="_blank" referrerPolicy="no-referrer">GitHub</Link>.</div> 
            </div>
        </footer>
    )
}