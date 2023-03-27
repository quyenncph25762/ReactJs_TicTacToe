import { useState } from "react";
import { Winner } from "../helpers";
import Square from "./square";

const Board = ({ board, setBoard, isXMove, setIsXMove, isWaiting, setIsWaiting }) => {
    const winner = Winner(board);
    const handleClick = async (index) => {
        const boardCopy = [...board];
        if (winner || boardCopy[index] || isWaiting) return;
        boardCopy[index] = isXMove ? "X" : "O";
        setBoard(boardCopy);
        setIsXMove(!isXMove);
        setIsWaiting(true);
        const winnerCopy = Winner(boardCopy);
        if (winnerCopy) {
            return;
        }
        await new Promise((resolve) => setTimeout(() => {
            const boardFilter = boardCopy
                .map((item, index) => item === null ? index : null)
                .filter((item) => item !== null);

            const randomIndex = Math.floor(Math.random() * boardFilter.length);
            const botIndex = boardFilter[randomIndex];
            boardCopy[botIndex] = isXMove ? "O" : "X";
            setBoard(boardCopy);
            setIsXMove(true);
            setIsWaiting(false);
            resolve();
        }, 1000))
        // setIsWaiting(false);
    };
    const playerWinner = (player) => {
        const boardIndex = [...board];
        const indexPlayer = [];
        boardIndex.map((values, i) => {
            if (player[0] === i) {
                indexPlayer.push(values)
                return values
            }
            return null
        })
        return indexPlayer
    }
    if (winner) {
        playerWinner(winner)
    }
    return (
        <div className={`grid grid-cols-3 gap-2 mt-10 relative`}>
            {winner ? <div className={`after:content-[*] after:inset-0 after:blur-sm after:bg-black absolute inset-0 backdrop-blur-sm text-[20px] flex justify-center items-center ${playerWinner(winner) ? "flex-col" : "hidden"} z-10`}>
                <div className={`text-[100px] ${playerWinner(winner)[0] && playerWinner(winner)[0] === "X" ? "text-[#545454]" : playerWinner(winner)[0] === "O" ? "text-[#F2EBD3]" : ""} font-bold`}>
                    {playerWinner(winner)}
                    <br />
                </div>
                <h1 className={`text-[50px] font-bold ${playerWinner(winner)[0] && playerWinner(winner)[0] === "X" ? "text-[#545454]" : playerWinner(winner)[0] === "O" ? "text-[#F2EBD3]" : ""}`}>Chiến thắng!</h1>
            </div> : ""}
            {board.map((item, index) => {
                const squareStyle =
                    item === "X" ? "text-[#545454]" : item === "O" ? "text-[#F2EBD3]" : "";
                const winningStyle =
                    winner && winner.includes(index) ? "animate-pulse" : "";
                return (
                    <Square
                        key={index}
                        value={item}
                        className={`${squareStyle} ${winningStyle}`}
                        onPay={() => handleClick(index)}
                    />
                );
            })}
        </div>
    );
};

export default Board;
