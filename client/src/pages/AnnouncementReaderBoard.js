import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";

const AnnouncementReaderBoard = () => {
  const [announcements, setAnnouncements] = useState();

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <h1>Announcement Board</h1>
      {announcements &&
        announcements.map((announcement) => {
          return <Announcement key={announcement.announcementId} announcement={announcement} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default AnnouncementReaderBoard;
