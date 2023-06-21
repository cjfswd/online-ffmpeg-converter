export type Icon = typeof VideoTypes | typeof AudioTypes | typeof ImageTypes

export const VideoTypes = [".mp4", ".webm", ".ogv", ".mpeg", ".mpg"] as const;
export const AudioTypes = [".mp3", ".aac", ".wav", ".flac"] as const;
export const ImageTypes = [".gif", ".webp"] as const;
export const AllTypes = [...VideoTypes, ...AudioTypes, ...ImageTypes]

export type VideoType = typeof VideoTypes[number];
export type AudioType = typeof AudioTypes[number];
export type ImageType = typeof ImageTypes[number];
export type AllType = typeof AllTypes[number];

export type File = {
    id: string
    Icon: Icon
    from: AllType
    name: string
    to: AllType
    size: string
    status: "pendente" | "processando" | "sucesso" | "falha"
}