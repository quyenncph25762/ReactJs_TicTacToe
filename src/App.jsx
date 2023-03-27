import { useState } from "react"
import Board from "./components/board"
const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXMove, setIsXMove] = useState(true)
    const [isWaiting, setIsWaiting] = useState(false);
    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setIsXMove(true)
        setIsWaiting(false)
    }

    return <div className="flex justify-center items-center h-screen flex-col bg-[#1E293B]">
        <button className="text-white py-3 px-5 bg-gray-400" onClick={resetGame}>Chơi lại khum ?</button>
        <Board board={board} setBoard={setBoard} isXMove={isXMove} setIsXMove={setIsXMove} isWaiting={isWaiting} setIsWaiting={setIsWaiting}>
        </Board>
    </div>
}

export default App