import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import ContentCard from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, GripVertical } from "lucide-react";
import { ContentItem } from "@/components/ContentSection";

interface DraggableContentSectionProps {
  title: string;
  description?: string;
  items: ContentItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onEditCard?: (card: ContentItem) => void;
  onReorder?: (items: ContentItem[]) => void;
}

export default function DraggableContentSection({
  title,
  description,
  items: initialItems,
  collapsible = false,
  defaultExpanded = true,
  onEditCard,
  onReorder,
}: DraggableContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [items, setItems] = useState(initialItems);

  // Separate featured and regular items
  const featuredItems = items.filter((item) => item.featured);
  const regularItems = items.filter((item) => !item.featured);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the list
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a new array with reordered items
    const newItems = Array.from(items);
    const draggedItem = newItems.find((item) => item.id === draggableId);

    if (draggedItem) {
      // Remove from old position
      const oldIndex = newItems.indexOf(draggedItem);
      newItems.splice(oldIndex, 1);

      // Insert at new position
      newItems.splice(destination.index, 0, draggedItem);

      setItems(newItems);
      onReorder?.(newItems);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {description && <p className="text-gray-400 mt-2">{description}</p>}
        </div>
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-400 hover:bg-cyan-500/10"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-6">
            {/* Featured Items */}
            {featuredItems.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wide">
                  Featured
                </h3>
                <Droppable droppableId="featured-items" type="CARD">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 rounded-lg transition-colors ${
                        snapshot.isDraggingOver
                          ? "bg-cyan-500/5 border-2 border-dashed border-cyan-500/50"
                          : ""
                      }`}
                    >
                      {featuredItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`relative transition-all ${
                                snapshot.isDragging
                                  ? "opacity-50 shadow-lg shadow-cyan-500/50"
                                  : ""
                              }`}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="absolute -left-8 top-2 z-10 cursor-grab active:cursor-grabbing"
                                title="Drag to reorder"
                              >
                                <GripVertical
                                  size={18}
                                  className="text-gray-500 hover:text-cyan-400 transition-colors"
                                />
                              </div>
                              <ContentCard {...item} onEdit={onEditCard} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}

            {/* Regular Items */}
            {regularItems.length > 0 && (
              <div>
                {featuredItems.length > 0 && (
                  <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                    All Items
                  </h3>
                )}
                <Droppable droppableId="regular-items" type="CARD">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 rounded-lg transition-colors ${
                        snapshot.isDraggingOver
                          ? "bg-cyan-500/5 border-2 border-dashed border-cyan-500/50"
                          : ""
                      }`}
                    >
                      {regularItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index + featuredItems.length}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`relative transition-all ${
                                snapshot.isDragging
                                  ? "opacity-50 shadow-lg shadow-cyan-500/50"
                                  : ""
                              }`}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="absolute -left-8 top-2 z-10 cursor-grab active:cursor-grabbing"
                                title="Drag to reorder"
                              >
                                <GripVertical
                                  size={18}
                                  className="text-gray-500 hover:text-cyan-400 transition-colors"
                                />
                              </div>
                              <ContentCard {...item} onEdit={onEditCard} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}

            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No content available yet.</p>
              </div>
            )}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
