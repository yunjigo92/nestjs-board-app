import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    //모든 게시물 조회
    getAllBoards(): Board[] {
        return this.boards;
    }


    //게시물 생성
    createBoard(title: string, description: string){
        const board: Board= {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;

    }

}
