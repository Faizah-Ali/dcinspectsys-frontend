import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import { Paths, VARIANTS } from "../../common/constants";
import { getDiarySearchParams } from "../application-details/helper";
import { showErrorToast } from "../../components/toast/helper";

import { styles } from "./style";

const ReassignApplications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { diaryNo: initialDiaryNo, diaryYear: initialDiaryYear } =
    getDiarySearchParams(searchParams);

  const [diaryNo, setDiaryNo] = useState(initialDiaryNo);
  const [diaryYear, setDiaryYear] = useState(initialDiaryYear);

  useEffect(() => {
    const { diaryNo: nextDiaryNo, diaryYear: nextDiaryYear } =
      getDiarySearchParams(searchParams);

    setDiaryNo(nextDiaryNo);
    setDiaryYear(nextDiaryYear);
  }, [searchParams]);

  const handleDiaryNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryNo(event.target.value);
  };

  const handleDiaryYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryYear(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDiaryNo = diaryNo.trim();
    const trimmedDiaryYear = diaryYear.trim();

    if (!trimmedDiaryNo || !trimmedDiaryYear) {
      showErrorToast("Please enter diary number and diary year");
      return;
    }

    const params = new URLSearchParams({
      diaryNo: trimmedDiaryNo,
      diaryYear: trimmedDiaryYear,
    });

    navigate(`${Paths.APPLICATION_DETAILS}?${params.toString()}`);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.contentContainer}>
        <Box component="h2" sx={styles.heading}>
          Re-Assign Inspection Applications
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={styles.formContainer}
        >
          <TextField
            label="Inspection Diary No."
            name="diaryNo"
            value={diaryNo}
            onChange={handleDiaryNoChange}
            sx={styles.inputField}
            fullWidth
          />

          <TextField
            label="Inspection Diary Year"
            name="diaryYear"
            value={diaryYear}
            onChange={handleDiaryYearChange}
            sx={styles.inputField}
            fullWidth
          />

          <Button
            type="submit"
            variant={VARIANTS.CONTAINED}
            sx={styles.getDetailsButton}
          >
            Get Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReassignApplications;
