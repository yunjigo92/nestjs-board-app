import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){};


    @Get('/')
    getAllBoards() : Board[] {
        return this.boardsService.getAllBoards();
    }


    @Post('/pull')
    createBoardFull(@Body() body){
        console.log('body',body);
    }

    @Post('/')
    createBoard(@Body() createBoardDto:CreateBoardDto): Board{
        return this.boardsService.createBoard(createBoardDto);
    }

    //특정 게시물 조회
    @Get('/:id')
    getBoardById(@Param('id') id : string) : Board{
        return this.boardsService.getBoardById(id);
    }

    //특정 게시물 삭제
    @Delete('/:id')
    deleteBoard(@Param('id') id : string): void{
        this.boardsService.deleteBoard(id);
    }

    //특정 게시물 상태변경
    @Patch(':id/status')
    updateBoardStatus(
        @Param('id') id : string,
        @Body('status') status: BoardStatus
    ): Board{
        return this.boardsService.updateBoardStatus(id, status);
    }
}



