import { useState } from "react";
import StickyNote from "./StickyNote";
import getRandomStickyColor from "../functions/getRandomStickyColor";
import getRandomStickyDirection from "../functions/getRandomStickyDirection";
import StudentBoardTaskModal from "../modals/StudentBoardTaskModal";

const StudentBoardTask = ({ task, boardState, setBoardState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {task && (
        <div onClick={() => setIsModalOpen(true)}>
          <StickyNote task={task} stickyColor={getRandomStickyColor()} stickyDirection={getRandomStickyDirection()} />
          <StudentBoardTaskModal stickyColor={getRandomStickyColor()} task={task} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} boardState={boardState} setBoardState={setBoardState} />
        </div>
      )}
    </>
  );
};

export default StudentBoardTask;
