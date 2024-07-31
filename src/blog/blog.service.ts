import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';

// 리포지토리 클래스, 인터페이스 임포트
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogFileRepository) {}
    
    // 모든 글 조회
    async getAllPosts() {
        return await this.blogRepository.getAllPost();
    }

    // 게시글 생성
    createPost(post: PostDto) {
        this.blogRepository.createPost(post);
    }

    // 게시글 조회
    async getPost(id: string) {
        return await this.blogRepository.getPost(id);
    }

    // 게시글 삭제
    delete(id: string) {
        this.blogRepository.deletePost(id);
    }

    // 게시글 수정
    updatePost(id: string, postDto: PostDto) {
        this.blogRepository.updatePost(id, postDto);
    }
}