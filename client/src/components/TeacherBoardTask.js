import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import TeacherBoardTaskModal from "../modals/TeacherBoardTaskModal";
import ConfirmTaskDeleteModal from "../modals/ConfirmTaskDeleteModal";
import { useState } from "react";
import StickyNote from "./StickyNote";
import getRandomStickyColor from "../functions/getRandomStickyColor";
import getRandomStickyDirection from "../functions/getRandomStickyDirection";

const TeacherBoardTask = ({ task, index, boardState, forceRefreshTeacherBoard, setForceRefreshTeacherBoard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskCard {...provided.draggableProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <div {...provided.dragHandleProps} onClick={() => setIsModalOpen(true)}>
            <ColorBar color={task.color} />
            <ContentContainer>
              <Title>{task.title}</Title>
              <Message>{task.message}</Message>
              {task.comments.length > 0 && <SeeComments>See comments...</SeeComments>}
              {task.file.fileName && <SeeFile>See attached file...</SeeFile>}
            </ContentContainer>
          </div>
          <DeleteButton type="button" onClick={() => setIsTaskDeleteModalOpen(true)}>
            Delete
          </DeleteButton>
          <ConfirmTaskDeleteModal
            isTaskDeleteModalOpen={isTaskDeleteModalOpen}
            setIsTaskDeleteModalOpen={setIsTaskDeleteModalOpen}
            boardState={boardState}
            task={task}
            forceRefreshTeacherBoard={forceRefreshTeacherBoard}
            setForceRefreshTeacherBoard={setForceRefreshTeacherBoard}
          />
          <TeacherBoardTaskModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} task={task} boardState={boardState} />
        </TaskCard>
      )}
    </Draggable>
  );
};

const TaskCard = styled.div`
  box-shadow: 0 0 3px var(--primary-color);
  color: #51565d;
  padding: 10px 0 20px 12px;
  background: white;
  text-align: start;
  position: relative;
  overflow-x: hidden;

  margin: 10px 0 20px 0;
  &:first-child {
    margin-top: 0;
  }
  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`;

const ColorBar = styled.div`
  background: ${(props) => props.color};
  height: 4px;
  width: 90%;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  width: 90%;
  * {
    text-align: center;
    font-family: "Comic Sans MS";
  }
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 25px;
`;

const Message = styled.p`
  font-size: 18px;
`;

const SeeComments = styled.p`
  font-size: 10px;
`;

const SeeFile = styled.p`
  font-size: 10px;
`;

const DeleteButton = styled.button`
  background: 0;
  padding: 0;
  color: var(--edit-color);
  font-size: 12px;
  font-family: "Comic Sans MS";
  position: absolute;
  bottom: 3px;
  margin-top: 5px;
`;

export default TeacherBoardTask;
