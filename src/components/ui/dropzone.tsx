"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, X, FileText, Image, Film } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface DropzoneProps {
  className?: string
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
  onDrop: (acceptedFiles: File[]) => void
  value?: File[]
  onChange?: (files: File[]) => void
}

export function Dropzone({
  className,
  maxFiles = 5,
  maxSize = 5242880, // 5MB
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    "video/*": [".mp4", ".mov", ".avi"],
    "application/pdf": [".pdf"],
  },
  onDrop,
  value = [],
  onChange,
  ...props
}: DropzoneProps) {
  const [files, setFiles] = useState<File[]>(value)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
      setFiles(newFiles)

      if (onChange) {
        onChange(newFiles)
      }

      onDrop(acceptedFiles)

      // Simulate upload progress
      acceptedFiles.forEach((file) => {
        simulateUploadProgress(file.name)
      })
    },
    [files, maxFiles, onChange, onDrop],
  )

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress((prev) => ({
        ...prev,
        [fileName]: progress,
      }))
    }, 300)
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)

    if (onChange) {
      onChange(newFiles)
    }
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: onDropAccepted,
    maxFiles,
    maxSize,
    accept,
  })

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-6 w-6 text-kas-green" />
    } else if (file.type.startsWith("video/")) {
      return <Film className="h-6 w-6 text-kas-blue" />
    } else {
      return <FileText className="h-6 w-6 text-kas-orange" />
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors",
          isDragActive
            ? "border-kas-green bg-kas-green/10"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          className,
        )}
        {...props}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground">
            or click to browse (max {maxFiles} files, {Math.round(maxSize / 1048576)}MB each)
          </p>
          <Button variant="outline" type="button" className="mt-2">
            Select Files
          </Button>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="text-sm text-destructive">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="mt-2">
              <strong>{file.name}</strong>: {errors.map((e) => e.message).join(", ")}
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="rounded-md border p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file)}
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({Math.round(file.size / 1024)} KB)</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
                <Progress value={uploadProgress[file.name] || 0} className="h-1 mt-2" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

