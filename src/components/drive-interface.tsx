"use client";

import {
  ChevronRight,
  Cloud,
  File,
  FileText,
  Folder,
  ImageIcon,
  MoreVertical,
  Music,
  Search,
  Upload,
  Video,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

type FileType = "folder" | "document" | "image" | "video" | "audio" | "file";

interface DriveItem {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  modified: string;
  url?: string;
  children?: DriveItem[];
}

const mockData: DriveItem[] = [
  {
    id: "1",
    name: "Work Projects",
    type: "folder",
    modified: "2 days ago",
    children: [
      {
        id: "1-1",
        name: "Q4 Report.pdf",
        type: "document",
        size: "2.4 MB",
        modified: "1 day ago",
        url: "/files/q4-report.pdf",
      },
      {
        id: "1-2",
        name: "Budget 2024.xlsx",
        type: "document",
        size: "856 KB",
        modified: "3 days ago",
        url: "/files/budget-2024.xlsx",
      },
      {
        id: "1-3",
        name: "Team Photos",
        type: "folder",
        modified: "1 week ago",
        children: [
          {
            id: "1-3-1",
            name: "team-meeting.jpg",
            type: "image",
            size: "3.2 MB",
            modified: "1 week ago",
            url: "/images/team-meeting.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Personal",
    type: "folder",
    modified: "5 days ago",
    children: [
      {
        id: "2-1",
        name: "vacation-video.mp4",
        type: "video",
        size: "124 MB",
        modified: "1 week ago",
        url: "/videos/vacation.mp4",
      },
      {
        id: "2-2",
        name: "playlist.mp3",
        type: "audio",
        size: "4.8 MB",
        modified: "2 weeks ago",
        url: "/audio/playlist.mp3",
      },
    ],
  },
  {
    id: "3",
    name: "Design Assets",
    type: "folder",
    modified: "1 week ago",
    children: [
      {
        id: "3-1",
        name: "logo-final.svg",
        type: "image",
        size: "124 KB",
        modified: "1 week ago",
        url: "/images/logo.svg",
      },
      {
        id: "3-2",
        name: "mockup.fig",
        type: "file",
        size: "8.2 MB",
        modified: "3 days ago",
        url: "/files/mockup.fig",
      },
    ],
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "document",
    size: "12.5 MB",
    modified: "Yesterday",
    url: "/files/presentation.pptx",
  },
  {
    id: "5",
    name: "screenshot.png",
    type: "image",
    size: "1.8 MB",
    modified: "Today",
    url: "/images/screenshot.png",
  },
];

const getFileIcon = (type: FileType) => {
  switch (type) {
    case "folder":
      return <Folder className="text-primary h-5 w-5" />;
    case "document":
      return <FileText className="h-5 w-5 text-blue-400" />;
    case "image":
      return <ImageIcon className="h-5 w-5 text-green-400" />;
    case "video":
      return <Video className="h-5 w-5 text-purple-400" />;
    case "audio":
      return <Music className="h-5 w-5 text-pink-400" />;
    default:
      return <File className="text-muted-foreground h-5 w-5" />;
  }
};

export function DriveInterface() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getCurrentItems = (): DriveItem[] => {
    let items = mockData;
    for (const folder of currentPath) {
      const found = items.find((item) => item.name === folder);
      items = found?.children || [];
    }
    return items;
  };

  const handleItemClick = (item: DriveItem) => {
    if (item.type === "folder") {
      setCurrentPath([...currentPath, item.name]);
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index));
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!");
  };

  const currentItems = getCurrentItems();
  const filteredItems = searchQuery
    ? currentItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : currentItems;

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* Header */}
      <header className="bg-card flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="text-primary h-6 w-6" />
            <h1 className="text-xl font-semibold">Drive</h1>
          </div>
          <div className="relative w-96">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="Search in Drive"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleUpload} className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <button
              onClick={() => setCurrentPath([])}
              className="text-muted-foreground hover:text-foreground"
            >
              My Drive
            </button>
            {currentPath.map((folder, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="text-muted-foreground h-4 w-4" />
                <button
                  onClick={() => handleBreadcrumbClick(index + 1)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {folder}
                </button>
              </div>
            ))}
          </div>

          {/* Items List */}
          {filteredItems.length === 0 ? (
            <div className="text-muted-foreground flex h-64 items-center justify-center">
              No items found
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card hover:bg-accent flex cursor-pointer items-center gap-4 rounded-lg border p-3 transition-all hover:shadow-sm"
                  onClick={() => handleItemClick(item)}
                >
                  {getFileIcon(item.type)}
                  <div className="flex-1 truncate text-sm font-medium">
                    {item.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {item.modified}
                  </div>
                  <div className="text-muted-foreground w-24 text-right text-sm">
                    {item.size ?? "—"}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
