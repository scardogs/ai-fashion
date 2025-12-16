import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BrollDataResponse } from "@/lib/broll3-data-webhook";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    data: BrollDataResponse[];
}

export function BrollDataTable({ data }: Props) {
    // If no data, we still show the table headers
    const safeData = data || [];
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(safeData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = safeData.slice(startIndex, startIndex + pageSize);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${label} to clipboard`);
    };

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="min-w-[300px]">Description</TableHead>
                        <TableHead>Camera Angle</TableHead>
                        <TableHead>Setting</TableHead>
                        <TableHead>Tags</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <a href={item.image_url} target="_blank" rel="noreferrer" className="block w-16 h-16 bg-muted rounded overflow-hidden hover:opacity-80 transition-opacity">
                                    <img
                                        src={item.image_url}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </a>
                            </TableCell>
                            <TableCell className="font-medium">{item.Category}</TableCell>
                            <TableCell>
                                <div className="space-y-2">
                                    <p className="text-sm line-clamp-4">{item.Description}</p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs px-2"
                                        onClick={() => copyToClipboard(item.Description, "Description")}
                                    >
                                        <Copy className="mr-1 h-3 w-3" /> Copy
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">{item["Camera Angle"]}</TableCell>
                            <TableCell className="text-sm">{item.Setting_Location}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {item.Tags.slice(0, 5).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-[10px]">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {item.Tags.length > 5 && (
                                        <Badge variant="outline" className="text-[10px]">
                                            +{item.Tags.length - 5}
                                        </Badge>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <div className="py-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
