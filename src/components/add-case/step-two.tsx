import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { X, Cloud } from "lucide-react";

export default function StepTwo(
  {
    nextStep,
    prevStep
  } : {
    nextStep: () => void,
    prevStep: () => void
  }
) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  const browseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) {
      return "📷";
    } else if (fileType.includes("pdf")) {
      return "📄";
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return "📝";
    } else if (fileType.includes("video")) {
      return "🎬";
    } else {
      return "📎";
    }
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div 
        className="border border-dashed border-gray-500 rounded p-8 text-center cursor-pointer transition-colors hover:bg-gray-50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={browseFiles}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="bg-gray-50 rounded-full p-3">
            <Cloud className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm font-medium">Arrasta y suelta los archivos</p>
          <p className="text-xs text-gray-500">
            Formatos soportados: JPG, JPEG, PNG, PDF & Word
          </p>
          <input 
            type="file" 
            className="hidden" 
            accept=".jpg, .jpeg, .png, .pdf, .docx, .doc"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
          />
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Archivos Subidos</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-md p-3 flex items-center relative hover:bg-gray-50 group"
              >
                <div className="mr-3 flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }} 
                  className="text-gray-400 hover:cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-4 justify-end mt-6">
        <Button 
          onClick={prevStep} 
          variant="outline" 
          className="border-gray-300 text-gray-700 hover:cursor-pointer"
        >
          Atrás
        </Button>
        <Button 
          onClick={nextStep}
          className="bg-black hover:bg-gray-800 text-white hover:cursor-pointer"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}