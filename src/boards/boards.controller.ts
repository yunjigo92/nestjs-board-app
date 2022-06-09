import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){};


    @Get('/')
    getAllBoards() : Board[] {
        return this.boardsService.getAllBoards();
    }


    @Post()
    createBoardFull(@Body() body){
        console.log('body',body);
    }


    @Post()
    createBoard(
        @Body('title') title : string,
        @Body('description') description: string
    ): Board{
        return this.boardsService.createBoard(title,description);
    }


}



