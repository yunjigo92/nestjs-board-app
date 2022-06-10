import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    //모든 게시물 조회
    getAllBoards(): Board[] {
        return this.boards;
    }


    //게시물 생성
    createBoard(createBoardDto : CreateBoardDto){
        const {title, description} = createBoardDto;
       
        const board: Board= {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;

    }

    //특정 게시물 찾기
    getBoardById(id : String) : Board{
        return this.boards.find((board) => board.id === id);
    }


    //특정 게시물 지우기
    deleteBoard(id: string) : void{
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    //특정 게시물의 상태 업데이트
    updateBoardStatus(id: string, status:BoardStatus) : Board{
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }

}
