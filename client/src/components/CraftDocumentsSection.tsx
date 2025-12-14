import { useState } from "react";
import { CraftDocumentCard } from "./CraftDocumentCard";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { Loader2 } from "lucide-react";
import { CraftDocumentItem, useCraftDocuments } from "@/hooks/useCraftDocuments";

interface CraftDocumentsSectionProps {
  onFavorite?: (documentId: string, title: string) => void;
  onDelete?: (documentId: string) => void;
  favoritedIds?: string[] | Set<string>;
}

export function CraftDocumentsSection({
  onFavorite,
  onDelete,
  favoritedIds = [],
}: CraftDocumentsSectionProps) {
  const [selectedDocument, setSelectedDocument] = useState<CraftDocumentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documents, isLoading, error } = useCraftDocuments();

  const handleOpenModal = (document: CraftDocumentItem) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDocument(null), 300);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
        <span className="ml-2 text-gray-400">Loading Craft documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-sm text-red-400">
          Failed to load Craft documents: {error.message}
        </p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-8 text-center">
        <p className="text-gray-400">No Craft documents found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <span className="text-sm font-bold text-white">📄</span>
        </div>
        <h2 className="text-lg font-semibold text-white">Craft Documents</h2>
        <span className="text-xs text-gray-400">({documents.length})</span>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((document) => (
          <div
            key={document.id}
            onClick={() => handleOpenModal(document)}
            className="cursor-pointer"
          >
            <CraftDocumentCard
              document={document}
              onFavorite={(doc) => onFavorite?.(doc.id, doc.title)}
              onDelete={onDelete}
              isFavorited={favoritedIds instanceof Set ? favoritedIds.has(document.id) : favoritedIds?.includes(document.id) ?? false}
            />
          </div>
        ))}
      </div>

      <DocumentPreviewModal
        document={selectedDocument}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
