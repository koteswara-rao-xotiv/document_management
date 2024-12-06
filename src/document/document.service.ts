import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./document.entity";
import { VerificationStatus } from "../common/enums/verification-status.enum";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { User } from "../user/user.entity";
import { join } from "path";
import { writeFileSync, unlinkSync } from "fs";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>
  ) {}

  async uploadDocument(
    file: Express.Multer.File,
    author: User
  ): Promise<Document> {
    if (!author) {
      throw new Error("User not found");
    }

    const filePath = join(__dirname, "..", "..", "uploads", file.originalname);
    writeFileSync(filePath, file.buffer);

    const document = this.documentRepository.create({
      title: file.originalname,
      fileUrl: filePath,
      author: author,
      verification_status: VerificationStatus.PENDING,
    });

    return this.documentRepository.save(document);
  }

  async updateDocument(
    id: string,
    updateDocumentDto: UpdateDocumentDto
  ): Promise<Document> {
    const updateValues = { ...updateDocumentDto };
    await this.documentRepository.update(id, updateValues);
    return this.findOne(id);
  }

  async deleteDocument(id: string): Promise<void> {
    const document = await this.findOne(id);
    if (document) {
      unlinkSync(document.fileUrl);
      await this.documentRepository.delete(id);
    }
  }

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find({ relations: ["author"] });
  }

  async findOne(id: string): Promise<Document> {
    return this.documentRepository.findOne({
      where: { id },
      relations: ["author"],
    });
  }

  async findByStatus(status: VerificationStatus): Promise<Document[]> {
    return this.documentRepository.find({
      where: { verification_status: status },
      relations: ["author"],
    });
  }
  async changeStatus(
    id: string,
    status: VerificationStatus
  ): Promise<Document> {
    await this.documentRepository.update(id, { verification_status: status });
    return this.findOne(id);
  }
}
