import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { DocumentService } from "../document/document.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { RolesGuard } from "../common/guards/roles.guard";
import { VerificationStatus } from "../common/enums/verification-status.enum";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller("ingestion")
@UseGuards(JwtAuthGuard, RolesGuard)
export class IngestionController {
  constructor(private readonly documentService: DocumentService) {}

  @Get("status/:status")
  @Roles(Role.Admin, Role.Editor)
  @ApiOperation({ summary: "Get documents by status" })
  @ApiParam({ name: "status", description: "Verification Status" })
  @ApiResponse({ status: 200, description: "List of documents by status" })
  async findByStatus(
    @Param("status") status: VerificationStatus
  ): Promise<any> {
    const documents = await this.documentService.findByStatus(status);
    return { documents };
  }

  @Patch("status/:id")
  @Roles(Role.Admin, Role.Editor)
  @ApiOperation({ summary: "Change document status" })
  @ApiParam({ name: "id", description: "Document ID" })
  @ApiBody({
    description: "New verification status",
    schema: { example: { status: "approved" } },
  })
  @ApiResponse({
    status: 200,
    description: "Document status changed successfully",
  })
  async changeStatus(
    @Param("id") id: string,
    @Body("status") status: VerificationStatus
  ): Promise<any> {
    const document = await this.documentService.changeStatus(id, status);
    return { message: "Document status changed successfully", document };
  }
}
