import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../src/user/user.entity';
import { Document } from '../src/document/document.entity';
import { Role } from '../src/role/role.entity';

describe('App E2E Tests', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let documentRepository: Repository<Document>;
  let roleRepository: Repository<Role>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User, Document, Role])],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get('UserRepository');
    documentRepository = moduleFixture.get('DocumentRepository');
    roleRepository = moduleFixture.get('RoleRepository');
    await app.init();
  });

  describe('Authentication', () => {
    it('/auth/register/admin (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/register/admin')
        .send({ email: 'admin@example.com',
          password: 'password',
          firstName: 'Admin',
          lastName: 'User',
        })
        .expect(201);
    });

    it('/auth/login (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'adminuser', password: 'password' })
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('access_token');
          token = response.body.access_token;
        });
    });
  });

  describe('User Management', () => {
    it('/users/:id/role (PATCH)', async () => {
      const user = await userRepository.findOne({ where: { username: 'adminuser' } });
      return request(app.getHttpServer())
        .patch(`/users/${user.id}/role`)
        .set('Authorization', `Bearer ${token}`)
        .send({ role: 'editor' })
        .expect(200);
    });
  });

  describe('Document Management', () => {
    it('/documents (POST) - Upload', () => {
      return request(app.getHttpServer())
        .post('/documents')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Test Document')
        .field('content', 'This is a test document.')
        .field('authorId', 1)
        .attach('file', 'test/file-to-upload.txt')
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
        });
    });

    it('/documents (GET) - Get All', () => {
      return request(app.getHttpServer())
        .get('/documents')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toBeInstanceOf(Array);
        });
    });

    it('/documents/:id (GET) - Get One', async () => {
      const document = await documentRepository.save({
        title: 'Test Document',
        content: 'This is a test document.',
        authorId: 1,
        filePath: 'testfile.txt',
      });
      return request(app.getHttpServer())
        .get(`/documents/${document.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('id', document.id);
        });
    });

    it('/documents/:id (PATCH) - Update', async () => {
      const document = await documentRepository.save({
        title: 'Test Document',
        content: 'This is a test document.',
        authorId: 1,
        filePath: 'testfile.txt',
      });
      return request(app.getHttpServer())
        .patch(`/documents/${document.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Test Document', content: 'Updated content.' })
        .expect(200);
    });

    it('/documents/:id (DELETE) - Delete', async () => {
      const document = await documentRepository.save({
        title: 'Test Document',
        content: 'This is a test document.',
        authorId: 1,
        filePath: 'testfile.txt',
      });
      return request(app.getHttpServer())
        .delete(`/documents/${document.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('Ingestion Management', () => {
    it('/ingestion/trigger (POST)', () => {
      return request(app.getHttpServer())
        .post('/ingestion/trigger')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    });

    it('/ingestion/status (GET)', () => {
      return request(app.getHttpServer())
        .get('/ingestion/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toBe('Ingestion in progress');
        });
    });

    it('/ingestion-management/:id/start (POST)', () => {
      return request(app.getHttpServer())
        .post('/ingestion-management/1/start')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    });

    it('/ingestion-management/:id/update (POST)', () => {
      return request(app.getHttpServer())
        .post('/ingestion-management/1/update')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'completed' })
        .expect(200);
    });

    it('/ingestion-management/:id/status (GET)', () => {
      return request(app.getHttpServer())
        .get('/ingestion-management/1/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toBe('completed');
        });
    });
  });

  afterAll(async () => {
    await userRepository.clear();
    await documentRepository.clear();
    await roleRepository.clear();
    await app.close();
  });
});

