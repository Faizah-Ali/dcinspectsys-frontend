import Popup from "../..";
import NoteSheet from "../../../../pages/note-sheet";
import type { ApplicationResponse } from "../../../../pages/inspec-applications/services/applications.type";

interface NoteSheetPopupProps {
  application: ApplicationResponse | null;
  onClose: () => void;
}

const NoteSheetPopup = ({ application, onClose }: NoteSheetPopupProps) => {
  return (
    <Popup
      open={Boolean(application)}
      title="NOTE SHEET"
      onClose={onClose}
      maxWidth="md"
    >
      {application && (
        <NoteSheet
          diaryNo={application.diaryNo}
          diaryYr={application.diaryYr}
          onClose={onClose}
        />
      )}
    </Popup>
  );
};

export default NoteSheetPopup;
