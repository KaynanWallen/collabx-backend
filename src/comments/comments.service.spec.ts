import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { PrismaCommentsRepository } from './repositories/prisma/prisma.comment.repository';
import { PrismaService } from 'src/database/prisma.service';

// Mock do repositório
const mockCommentsRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        PrismaService,
        {
          provide: PrismaCommentsRepository,
          useValue: mockCommentsRepository, // Usamos o mock no lugar do repositório real
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a comment', async () => {
    const createCommentDTO: CreateCommentDTO = {
      projectId: 1,
      authorId: 1,
      content: 'Test comment content',
      parentId: null,
    };

    // Configura o comportamento do mock
    mockCommentsRepository.create.mockResolvedValue({
      id: 1,
      ...createCommentDTO,
    });

    const result = await service.create(createCommentDTO);
    expect(result).toHaveProperty('id');
    expect(result.content).toBe('Test comment content');
  });

  it('should return all comments', async () => {
    const mockComments = [
      { id: 1, content: 'Comment 1' },
      { id: 2, content: 'Comment 2' },
    ];

    mockCommentsRepository.findAll.mockResolvedValue(mockComments);

    const result = await service.findAll();
    expect(result).toEqual(mockComments);
  });

  it('should update a comment', async () => {
    const updateCommentDTO: UpdateCommentDTO = {
      content: 'Updated content',
    };

    const updatedComment = {
      id: 1,
      content: 'Updated content',
    };

    mockCommentsRepository.update.mockResolvedValue(updatedComment);

    const result = await service.update(1, updateCommentDTO);
    expect(result).toHaveProperty('id');
    expect(result.content).toBe('Updated content');
  });

  it('should remove a comment', async () => {
    const mockComment = { id: 1, content: 'Comment to be removed' };

    mockCommentsRepository.remove.mockResolvedValue(mockComment);

    const result = await service.remove(1);
    expect(result).toHaveProperty('id');
    expect(result).not.toBeNull();
    expect(result?.id).toBe(1); 
  });

  it('should return a comment by id', async () => {
    const mockComment = { id: 1, content: 'Test comment' };

    mockCommentsRepository.findOne.mockResolvedValue(mockComment);

    const result = await service.findOne(1);
    expect(result).toHaveProperty('id');
    expect(result).not.toBeNull();
    expect(result?.content).toBe('Test comment');
  });
});
