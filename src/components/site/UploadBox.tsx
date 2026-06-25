import { Upload, FileText, X } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

type Props = {
  file: File | null;
  onFile: (file: File | null) => void;
};

export function UploadBox({ file, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") onFile(f);
  }

  if (file) {
    return (
      <div className="glass-strong shadow-card flex items-center justify-between gap-3 rounded-2xl p-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="bg-gradient-primary grid h-12 w-12 shrink-0 place-items-center rounded-xl">
            <FileText className="h-6 w-6 text-white" />
          </span>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold">{file.name}</p>
            <p className="text-muted-foreground text-xs">
              {(file.size / 1024 / 1024).toFixed(2)} MB · PDF document
            </p>
          </div>
        </div>
        <button
          onClick={() => onFile(null)}
          className="hover:bg-accent grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group glass-strong shadow-soft hover:shadow-glow relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
        dragging ? "border-primary scale-[1.01]" : "border-border"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <div className="bg-gradient-primary shadow-glow mx-auto grid h-16 w-16 place-items-center rounded-2xl transition-transform group-hover:-translate-y-1">
        <Upload className="h-7 w-7 text-white" strokeWidth={2.4} />
      </div>
      <h3 className="mt-5 text-lg font-semibold">Drop your PDF here</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        or click to browse · up to 50 MB
      </p>
    </div>
  );
}
