"use client"
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { AlertDialogDemo } from "@/components/alert-dialog";
import { useDropArea } from 'react-use';
import { VideoTypes, AudioTypes, ImageTypes, ImageType, AllType, AudioType, VideoType } from '@/config/system';
import { Badge } from "@/components/ui/badge";
import { useFileInput } from "./file-context";
import { AllTypes } from '../config/system';

declare global {
  interface Window {
    ffmpeg: FFmpeg;
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export const InputTest = () => {
  const [error, setError] = useState<string | null>(null)
  const [convertedFile, setConvertedFile] = useState<File | null>(null)
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLMediaElement | null>(null);
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

  useEffect(() => {
    load();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      handleFileChange(file);
      setConvertedFile(null);
    } else {
      handleFileChange(null);
      setConvertedFile(null);
    }
  };

  const validateFile = (file: File): boolean => {
    const fileSizeLimit = 2 * 1024 * 1024 * 1024; // 2GB in bytes
    const { size, name } = file;

    if (size > fileSizeLimit) {
      setError('O arquivo excede o limite de 2GB');
      return false;
    }

    if (!AllTypes.includes(`.${name.split('.')[1]}` as AllType)) {
      setError('Extensão de arquivo inválida');
      return false;
    }
    setError(null)
    return true
  };

  const Compatibility = () => {
    const { selectedFile } = useFileInput();
    let extension = selectedFile?.name.split('.').pop()

    return (
      <>
        {
          typeof extension !== 'undefined' && <>
            <TypeSection types={VideoTypes.filter((item) => item.includes(extension!)) as unknown as string[]} variant="red" />
            <TypeSection types={AudioTypes.filter((item) => item.includes(extension!)) as unknown as string[]} variant="blue" />
            <TypeSection types={ImageTypes.filter((item) => item.includes(extension!)) as unknown as string[]} variant="green" />
          </>
        }
        {
          !selectedFile && <>
            <TypeSection types={VideoTypes as unknown as string[]} variant="red" />
            <TypeSection types={AudioTypes as unknown as string[]} variant="blue" />
            <TypeSection types={ImageTypes as unknown as string[]} variant="green" />
          </>
        }
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

  const [bond, state] = useDropArea({
    onFiles: files => {
      if (validateFile(files[0])) {
        handleFileChange(files[0]);
        setConvertedFile(null);
      } else {
        handleFileChange(null);
        setConvertedFile(null);
      }
    }
  });

  const { selectedFile, handleFileChange } = useFileInput();

  return <div {...bond}>
    <label htmlFor="upload" className="flex min-h-[14rem] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-4">
      <div className="text-2xl font-semibold">
        {selectedFile && selectedFile?.name.split('.')[0]}
        {!selectedFile && 'Solte seu arquivo aqui.'}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        <Compatibility />
      </div>
    </label>
    {error && <AlertDialogDemo message={error} open={true} onOpenChange={() => setError(null)} />}
    <Input key={selectedFile == null ? Date.now() : Date.now()} id="upload" type="file" accept={AllTypes.join(',')} className="hidden" multiple={false} onChange={onChange} />
  </div>
}
