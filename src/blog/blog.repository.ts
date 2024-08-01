import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";
import { PostDto } from "./blog.model";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "./blog.schema";
import { InjectModel } from "@nestjs/mongoose";


export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(post: PostDto): Promise<void>;
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String): Promise<void>;
    updatePost(id:String, post: PostDto):Promise<void>;
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    
    FILE_NAME = './src/blog/blog.data.json';

    async getAllPost(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf-8');
        const posts = JSON.parse(datas);
        return posts;
    }

    // 게시글 쓰기
    async createPost(post: PostDto): Promise<void> {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...post, createdDt: new Date() };
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    // 게시글 조회
    async getPost(id: String): Promise<PostDto> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result;
    }

    // 게시글 삭제
    async deletePost(id: String): Promise<void> {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    // 게시글 수정
    async updatePost(id: String, post: PostDto): Promise<void> {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...post, updatedDt: new Date()};
        posts[index] = updatePost;
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
    
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    // 게시글 읽어오기
    async getAllPost(): Promise<Blog[]> {
        return await this.blogModel.find().exec();
    }

    //게시글 작성
    async createPost(post: PostDto): Promise<void> {
        const createPost = {
            ...post,
            createdDt: new Date(),
            updatedDt: new Date()
        };
        this.blogModel.create(createPost);
    }

    // 게시글 조회
    async getPost(id: String): Promise<PostDto> {
        return await this.blogModel.findById(id).exec();
    }

    //게시글 삭제
    async deletePost(id: String): Promise<void> {
        await this.blogModel.findByIdAndDelete(id);
    }

    //게시글 업데이트
    async updatePost(id: String, post: PostDto): Promise<void> {
        const updatePost = {id, ...post, updatedDt: new Date()};
        await this.blogModel.findByIdAndUpdate(id, updatePost);
    }
}