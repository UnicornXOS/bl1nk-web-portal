import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ContentItem } from "@/components/ContentSection";

interface CardEditorProps {
  isOpen: boolean;
  card: ContentItem | null;
  onClose: () => void;
  onSave: (card: ContentItem) => void;
}

export default function CardEditor({ isOpen, card, onClose, onSave }: CardEditorProps) {
  const [editedCard, setEditedCard] = useState<ContentItem | null>(card);
  const [newTag, setNewTag] = useState("");

  // Update edited card when card prop changes
  useEffect(() => {
    setEditedCard(card);
  }, [card]);

  if (!editedCard) return null;

  const handleSave = () => {
    if (editedCard) {
      onSave(editedCard);
      onClose();
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedCard.tags?.includes(newTag)) {
      setEditedCard({
        ...editedCard,
        tags: [...(editedCard.tags || []), newTag],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedCard({
      ...editedCard,
      tags: editedCard.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-cyan-500/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Content Card</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Title</label>
            <Input
              value={editedCard.title}
              onChange={(e) =>
                setEditedCard({ ...editedCard, title: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              placeholder="Enter title"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <Textarea
              value={editedCard.description}
              onChange={(e) =>
                setEditedCard({ ...editedCard, description: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 resize-none"
              placeholder="Enter description"
              rows={4}
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">URL</label>
            <Input
              value={editedCard.url}
              onChange={(e) =>
                setEditedCard({ ...editedCard, url: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              placeholder="https://example.com"
              type="url"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Tags</label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag();
                  }
                }}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                placeholder="Add a tag and press Enter"
              />
              <Button
                onClick={handleAddTag}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Add
              </Button>
            </div>

            {/* Tag Display */}
            {editedCard.tags && editedCard.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {editedCard.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-slate-700/50 text-gray-300 border-slate-600/50 gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Last Updated */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Last Updated</label>
            <Input
              value={editedCard.lastUpdated || ""}
              onChange={(e) =>
                setEditedCard({ ...editedCard, lastUpdated: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              placeholder="e.g., 2 days ago"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={editedCard.featured || false}
              onChange={(e) =>
                setEditedCard({ ...editedCard, featured: e.target.checked })
              }
              className="w-4 h-4 rounded border-gray-600 bg-slate-800 text-cyan-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-300">
              Mark as Featured
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-slate-600 text-gray-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
