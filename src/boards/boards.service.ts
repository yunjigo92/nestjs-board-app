import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './boards-status.enum';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){};


    async getAllBoards() : Promise<Board[]>{
        return this.boardRepository.find();
    }


    async getBoardById(id: number) : Promise<Board> {
        const found = await this.boardRepository.findOne(id);
        
        if(!found){
            throw new NotFoundException(`Can't found by ${id}`);
        }
        return found;
    }

    createBoard(createBoardDto: CreateBoardDto) : Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }


    async deleteBoard(id: number): Promise<void>{
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Not found with id ${id}`);
        }

        console.log('result',result);
    }


    async updateBoardStatus(id: number, status: BoardStatus) : Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        return await this.boardRepository.save(board);
    }


    // private boards: Board[] = [];

    // //모든 게시물 조회
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }


    // //게시물 생성
    // createBoard(createBoardDto : CreateBoardDto){
    //     const {title, description} = createBoardDto;
       
    //     const board: Board= {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;

    // }

    // //특정 게시물 찾기
    // getBoardById(id : String) : Board{
    //     const found = this.boards.find((board) => board.id === id);
    //     if(!found){ // 없는 게시물을 찾으려고 할 때 에러 추가
    //         throw new NotFoundException("Can't find board with id ${id}");
    //     }
    //     return found;
    // }


    // //특정 게시물 지우기
    // deleteBoard(id: string) : void{
    //     const found = this.getBoardById(id); //없는 게시물을 지우려고 할 때 처리 추가
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    
    // //특정 게시물의 상태 업데이트
    // updateBoardStatus(id: string, status:BoardStatus) : Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
    
}
