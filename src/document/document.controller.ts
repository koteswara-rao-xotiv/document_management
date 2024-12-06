import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DocumentService } from "./document.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RolesGuard } from "../common/guards/roles.guard";
import { memoryStorage } from "multer";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
@Controller("documents")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post("upload")
  @Roles(Role.Admin, Role.Editor)
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  @ApiOperation({ summary: "Upload a document" })
  @ApiBody({ description: "File to be uploaded" })
  @ApiResponse({ status: 201, description: "Document uploaded successfully" })
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ): Promise<any> {
    const document = await this.documentService.uploadDocument(file, req.user);
    return { message: "Document uploaded successfully", document };
  }

  @Get()
  @ApiOperation({ summary: "Get all documents" })
  @ApiResponse({ status: 200, description: "List of documents" })
  async findAll(@Request() req): Promise<any> {
    const documents = await this.documentService.findAll();
    return { documents };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a document by ID" })
  @ApiParam({ name: "id", description: "Document ID" })
  @ApiResponse({ status: 200, description: "Document found" })
  async findOne(@Param("id") id: string): Promise<any> {
    const document = await this.documentService.findOne(id);
    return { document };
  }

  @Patch("update/:id")
  @Roles(Role.Admin, Role.Editor)
  @ApiOperation({ summary: "Update a document" })
  @ApiParam({ name: "id", description: "Document ID" })
  @ApiBody({ type: UpdateDocumentDto })
  @ApiResponse({ status: 200, description: "Document updated successfully" })
  async updateDocument(
    @Param("id") id: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ): Promise<any> {
    const document = await this.documentService.updateDocument(
      id,
      updateDocumentDto
    );
    return { message: "Document updated successfully", document };
  }

  @Delete("delete/:id")
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Delete a document" })
  @ApiParam({ name: "id", description: "Document ID" })
  @ApiResponse({ status: 200, description: "Document deleted successfully" })
  async deleteDocument(@Param("id") id: string): Promise<any> {
    await this.documentService.deleteDocument(id);
    return { message: "Document deleted successfully" };
  }
}
