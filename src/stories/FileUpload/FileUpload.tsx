import React, { useId, useRef, useState, useEffect } from 'react';
import './fileupload.css';
import { cn } from '../../utils';

const IMAGE_TYPES = /^image\//;

export interface FileUploadProps {
  /** Accepted file types (e.g. "image/*", ".pdf") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Called when files are selected or dropped */
  onFilesChange?: (files: File[]) => void;
  /** Label above the zone */
  label?: string;
  /** Id for the hidden input */
  id?: string;
  /** Helper or error text below */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Placeholder / instruction text */
  placeholder?: string;
  /** Max file size in bytes (optional) */
  maxSize?: number;
  /** Show file preview (images as thumbnails, others as file cards) */
  showPreview?: boolean;
  /** Root class name */
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  onFilesChange,
  label,
  id: idProp,
  helperText,
  error = false,
  disabled = false,
  placeholder = 'Drag and drop files here, or click to browse',
  maxSize,
  showPreview = true,
  className,
}) => {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Map<File, string>>(new Map());
  const urlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current.clear();
    };
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const list = multiple ? Array.from(files) : [files[0]];
    const valid = maxSize ? list.filter((f) => f.size <= maxSize) : list;
    setSelectedFiles(valid);
    onFilesChange?.(valid);
    if (showPreview) {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current.clear();
      const next = new Map<File, string>();
      valid.forEach((f) => {
        if (IMAGE_TYPES.test(f.type)) {
          const url = URL.createObjectURL(f);
          next.set(f, url);
          urlsRef.current.add(url);
        }
      });
      setPreviewUrls(next);
    }
  };

  const handleRemoveFile = (index: number) => {
    const file = selectedFiles[index];
    const url = previewUrls.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      urlsRef.current.delete(url);
      setPreviewUrls((prev) => {
        const next = new Map(prev);
        next.delete(file);
        return next;
      });
    }
    setSelectedFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      onFilesChange?.(next);
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const rootClassName = cn(
    'fileupload-root',
    error && 'fileupload-root--error',
    disabled && 'fileupload-root--disabled',
    isDragOver && 'fileupload-root--dragOver',
    className
  );

  return (
    <div className={rootClassName}>
      {label && (
        <label htmlFor={inputId} className="fileupload-label" id={`${inputId}-label`}>
          {label}
        </label>
      )}
      <div
        className="fileupload-zone"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={disabled ? undefined : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-labelledby={label ? `${inputId}-label` : undefined}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        aria-disabled={disabled}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="fileupload-input"
          aria-hidden
        />
        <span className="fileupload-icon" aria-hidden>
          <UploadIcon />
        </span>
        <span className="fileupload-text">
          {selectedFiles.length > 0
            ? multiple
              ? `${selectedFiles.length} file(s) selected`
              : selectedFiles[0].name
            : placeholder}
        </span>
      </div>
      {showPreview && selectedFiles.length > 0 && (
        <div className="fileupload-preview">
          {selectedFiles.map((file, index) => {
            const isImage = IMAGE_TYPES.test(file.type);
            const url = previewUrls.get(file);
            return (
              <div key={`${file.name}-${file.lastModified}-${index}`} className="fileupload-preview-item">
                {isImage && url ? (
                  <div className="fileupload-preview-thumb">
                    <img src={url} alt={file.name} className="fileupload-preview-img" />
                    {!disabled && (
                      <button
                        type="button"
                        className="fileupload-preview-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        aria-label={`Remove ${file.name}`}
                      >
                        <RemoveIcon />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="fileupload-preview-file">
                    <span className="fileupload-preview-file-icon" aria-hidden>
                      <FileIcon />
                    </span>
                    <span className="fileupload-preview-file-name" title={file.name}>
                      {file.name}
                    </span>
                    {!disabled && (
                      <button
                        type="button"
                        className="fileupload-preview-remove fileupload-preview-remove--card"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        aria-label={`Remove ${file.name}`}
                      >
                        <RemoveIcon />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {helperText && (
        <p id={`${inputId}-helper`} className={cn('fileupload-helper', error && 'fileupload-helper--error')}>
          {helperText}
        </p>
      )}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';

function UploadIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15v6" />
      <path d="M15 15v6" />
    </svg>
  );
}
