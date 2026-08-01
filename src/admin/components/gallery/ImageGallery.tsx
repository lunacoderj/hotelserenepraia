import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RoomImage } from '../../types';
import { galleryService } from '../../services/galleryService';
import { Star, Trash2, GripVertical, UploadCloud, Loader2 } from 'lucide-react';

interface SortableItemProps {
  image: RoomImage;
  onDelete: (id: string) => void;
  onSetFeatured: (id: string) => void;
}

const SortableItem = ({ image, onDelete, onSetFeatured }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group bg-slate-50 rounded-lg border border-navy/10 overflow-hidden">
      <div className="aspect-[4/3] w-full">
        <img src={image.url} alt="Room" className="w-full h-full object-cover" />
      </div>
      
      {image.isFeatured && (
        <div className="absolute top-2 left-2 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1 uppercase tracking-wider">
          <Star className="w-3 h-3 fill-navy" /> Featured
        </div>
      )}

      <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button 
          onClick={() => onSetFeatured(image.id)}
          className={`p-2 rounded-full ${image.isFeatured ? 'bg-gold text-navy' : 'bg-white/20 text-white hover:bg-gold hover:text-navy'} transition-colors`}
          title="Set as Featured"
        >
          <Star className={`w-4 h-4 ${image.isFeatured ? 'fill-navy' : ''}`} />
        </button>
        <button 
          onClick={() => onDelete(image.id)}
          className="p-2 rounded-full bg-white/20 text-white hover:bg-red-500 transition-colors"
          title="Delete Image"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div 
        {...attributes} 
        {...listeners} 
        className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded cursor-grab active:cursor-grabbing text-navy-500"
      >
        <GripVertical className="w-4 h-4" />
      </div>
    </div>
  );
};

interface ImageGalleryProps {
  images: RoomImage[];
  onUpdate: (images: RoomImage[]) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      
      const newImages = arrayMove(images, oldIndex, newIndex).map((img, idx) => ({
        ...img,
        order: idx
      }));
      
      onUpdate(newImages);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    const imgToDelete = images.find(img => img.id === id);
    if (imgToDelete) {
      try {
        await galleryService.deleteImage(imgToDelete.url);
      } catch (err) {
        console.error("Failed to delete from storage", err);
      }
    }

    const newImages = images.filter(img => img.id !== id);
    // If we deleted the featured image, make the first remaining one featured
    if (imgToDelete?.isFeatured && newImages.length > 0) {
      newImages[0].isFeatured = true;
    }
    onUpdate(newImages);
  };

  const handleSetFeatured = (id: string) => {
    const newImages = images.map(img => ({
      ...img,
      isFeatured: img.id === id
    }));
    onUpdate(newImages);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newImagesList = [...images];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await galleryService.uploadImage(file);
        
        newImagesList.push({
          id: `img-${Date.now()}-${i}`,
          url,
          isFeatured: newImagesList.length === 0, // make featured if it's the first image ever
          order: newImagesList.length
        });
      }
      
      onUpdate(newImagesList);
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = ''; // reset input
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-medium text-navy">Room Gallery</h2>
          <p className="text-sm text-navy-500/70">Drag and drop to reorder images. The first image is usually the featured one.</p>
        </div>
        <div className="relative">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          />
          <button 
            disabled={isUploading}
            className="flex items-center gap-2 bg-navy text-pearl px-4 py-2 rounded-md hover:bg-gold transition-colors text-sm font-medium disabled:opacity-70"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-navy/10 rounded-xl p-12 text-center bg-slate-50">
          <UploadCloud className="w-8 h-8 text-navy-500/40 mx-auto mb-3" />
          <p className="text-navy-500">No images uploaded yet.</p>
          <p className="text-sm text-navy-500/60 mt-1">Click the upload button above to add images to this room.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <SortableItem 
                  key={image.id} 
                  image={image} 
                  onDelete={handleDelete}
                  onSetFeatured={handleSetFeatured}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
