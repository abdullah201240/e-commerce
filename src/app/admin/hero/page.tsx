"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { heroSlides } from "@/data/products";
import {
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Image as ImageIcon,
  Save,
  X,
} from "lucide-react";

// Define the HeroSlide interface
interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  category: string;
}

export default function AdminHeroPage() {
  // State for hero slides
  const [slides, setSlides] = useState<HeroSlide[]>(heroSlides);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<HeroSlide | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle opening the sheet for adding a new slide
  const handleAddSlide = () => {
    setCurrentSlide({
      id: Date.now(),
      title: "",
      subtitle: "",
      image: "",
      cta: "",
      category: "",
    });
    setIsEditing(false);
    setIsSheetOpen(true);
  };

  // Handle opening the sheet for editing a slide
  const handleEditSlide = (slide: HeroSlide) => {
    setCurrentSlide({ ...slide });
    setIsEditing(true);
    setIsSheetOpen(true);
  };

  // Handle saving a slide (add or update)
  const handleSaveSlide = () => {
    if (!currentSlide) return;

    if (isEditing) {
      // Update existing slide
      setSlides(slides.map(slide => slide.id === currentSlide.id ? currentSlide : slide));
    } else {
      // Add new slide
      setSlides([...slides, currentSlide]);
    }

    setIsSheetOpen(false);
    setCurrentSlide(null);
  };

  // Handle deleting a slide
  const handleDeleteSlide = (id: number) => {
    setSlides(slides.filter(slide => slide.id !== id));
  };

  // Handle input changes in the form
  const handleInputChange = (field: keyof HeroSlide, value: string) => {
    if (currentSlide) {
      setCurrentSlide({ ...currentSlide, [field]: value });
    }
  };

  return (
    <AdminLayout
      title="Hero Section"
      subtitle="Manage your hero section slides"
    >
      <div className="space-y-6">
        {/* Add New Slide Button */}
        <div className="flex justify-end">
          <Button onClick={handleAddSlide} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Slide
          </Button>
        </div>

        {/* Hero Slides Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Hero Slides ({slides.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>CTA</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        {slide.image ? (
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{slide.title}</TableCell>
                    <TableCell>{slide.subtitle}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {slide.category}
                      </span>
                    </TableCell>
                    <TableCell>{slide.cta}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditSlide(slide)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteSlide(slide.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Slide Editor Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="sm:max-w-[425px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{isEditing ? "Edit Hero Slide" : "Add New Hero Slide"}</SheetTitle>
              <SheetDescription>
                {isEditing 
                  ? "Make changes to your hero slide here." 
                  : "Add a new hero slide to your homepage."}
              </SheetDescription>
            </SheetHeader>
            {currentSlide && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right text-sm font-medium">
                    Title
                  </label>
                  <div className="col-span-3">
                    <Input
                      id="title"
                      value={currentSlide.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="subtitle" className="text-right text-sm font-medium">
                    Subtitle
                  </label>
                  <div className="col-span-3">
                    <textarea
                      id="subtitle"
                      value={currentSlide.subtitle}
                      onChange={(e) => handleInputChange("subtitle", e.target.value)}
                      className="col-span-3 flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-right text-sm font-medium">
                    Image URL
                  </label>
                  <div className="col-span-3">
                    <Input
                      id="image"
                      value={currentSlide.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right text-sm font-medium">
                    Category
                  </label>
                  <div className="col-span-3">
                    <Input
                      id="category"
                      value={currentSlide.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="cta" className="text-right text-sm font-medium">
                    CTA Text
                  </label>
                  <div className="col-span-3">
                    <Input
                      id="cta"
                      value={currentSlide.cta}
                      onChange={(e) => handleInputChange("cta", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
              </div>
            )}
            <SheetFooter>
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSaveSlide}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Update Slide" : "Add Slide"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}