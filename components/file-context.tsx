"use client"
import { AllType, AudioTypes, AudioType, ImageTypes, ImageType, VideoTypes, VideoType } from '@/config/system';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

// Define TypeScript types
interface FileInputContextType {
  selectedFile: File | null;
  handleFileChange: React.Dispatch<React.SetStateAction<File | null>>;
  convertedFile: string | null;
  setConvertedFile: React.Dispatch<React.SetStateAction<string | null>>;
  transcode: (file: File, extension: AllType) => Promise<void>;
  transcoding: boolean | 'Falha ao converter.'
}

// Create a context
const FileInputContext = createContext<FileInputContextType | undefined>(undefined);

// Custom hook to use the context
export function useFileInput(): FileInputContextType {
  const context = useContext(FileInputContext);
  if (!context) {
    throw new Error('useFileInput must be used within a FileInputProvider');
  }
  return context;
}

// FileInputProvider component
interface FileInputProviderProps {
  children: ReactNode;
}

export function FileInputProvider({ children }: FileInputProviderProps) {
  const [selectedFile, handleFileChange] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null)
  const [transcoding, setTranscoding] = useState<boolean | 'Falha ao converter.'>(false);
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLElement | null>(null);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd'
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        "text/javascript",
      ),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });
    setLoaded(true);
  }

  const transcode = async (file: File, extension: AllType) => {
    setTranscoding(true)
    try {
      const extensionType = (() => {
        if (AudioTypes.includes(extension as AudioType)) return 'audio/'
        if (ImageTypes.includes(extension as ImageType)) return 'image/'
        if (VideoTypes.includes(extension as VideoType)) return 'video/'
      })()
      const transcodedFileName = `${file.name.split('.')[0]}${extension}`
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile(
        file.name,
        await fetchFile(file)
      );
      await ffmpeg.exec(['-i', file.name, transcodedFileName]);
      const data = await ffmpeg.readFile(transcodedFileName) as Uint8Array;
      setConvertedFile(URL.createObjectURL(new Blob([data.buffer], { type: `${extensionType}${extension.replace(/./g, '')}` })))
    } catch (error) {
      setTranscoding('Falha ao converter.')
    }
    setTranscoding(false)
  }

  useEffect(() => {
    load();
  }, []);

  const contextValue = {
    selectedFile,
    handleFileChange,
    convertedFile,
    setConvertedFile,
    transcode,
    transcoding
  };

  return (
    <FileInputContext.Provider value={contextValue}>
      {children}
    </FileInputContext.Provider>
  );
}
