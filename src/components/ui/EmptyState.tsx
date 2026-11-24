import React from "react";
import Link from "next/link";
import { FolderSearch, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionHref?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionHref,
  actionText,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-dashed border-slate-300 my-4 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-campus-teal mb-4 ring-8 ring-slate-50/50">
        {icon || <FolderSearch className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-lg font-bold text-campus-navy mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
      
      {actionHref && actionText && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-4 py-2 bg-campus-navy text-white text-sm font-semibold rounded-lg hover:bg-campus-navy-light transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {actionText}
        </Link>
      )}

      {onActionClick && actionText && !actionHref && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-campus-navy text-white text-sm font-semibold rounded-lg hover:bg-campus-navy-light transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
};
