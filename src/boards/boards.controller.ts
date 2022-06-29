import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './boards-status.enum';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService){};

    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<Board>{
        return this.boardsService.getBoardById(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto) : Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id) : Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

    @Patch(':id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id : number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board>{
        return this.boardsService.updateBoardStatus(id, status);
    }
    
    @Get('/')
    getAllBoards() : Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    // @Get('/')
    // getAllBoards() : Board[] {
    //     return this.boardsService.getAllBoards();
    // }


    // @Post('/pull')
    // createBoardFull(@Body() body){
    //     console.log('body',body);
    // }

    // @Post('/')
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto:CreateBoardDto): Board{
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    // //특정 게시물 조회
    // @Get('/:id')
    // getBoardById(@Param('id') id : string) : Board{
    //     return this.boardsService.getBoardById(id);
    // }

    // //특정 게시물 삭제
    // @Delete('/:id')
    // deleteBoard(@Param('id') id : string): void{
    //     this.boardsService.deleteBoard(id);
    // }

    // //특정 게시물 상태변경
    // @Patch(':id/status')
    // updateBoardStatus(
    //     @Param('id') id : string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ): Board{
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}



