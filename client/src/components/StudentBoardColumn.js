import styled from "styled-components";
import StudentBoardTask from "./StudentBoardTask";

const StudentBoardColumn = ({ column, tasks }) => {
  return (
    <Wrapper>
      <h3>{column.id}</h3>
      <ColumnWrapper>
        {column.taskIds.map((taskId) => {
          return <StudentBoardTask key={taskId} task={tasks[taskId]} />;
        })}
      </ColumnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnWrapper = styled.div`
  background: lightgray;
  height: 100%;
`;

export default StudentBoardColumn;