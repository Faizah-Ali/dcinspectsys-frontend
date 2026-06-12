import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { styles } from "./style";
import { VARIANTS } from "../../common/constants";

const ReassignApplications = () => {
  const [diaryNo, setDiaryNo] = useState("");
  const [diaryYear, setDiaryYear] = useState("");

  // Handle input changes
  const handleDiaryNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryNo(e.target.value);
  };

  const handleDiaryYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiaryYear(e.target.value);
  };

  // Handle button click
  const handleGetDetails = () => {
    // You can add logic here later to fetch details
    console.log("Diary No:", diaryNo);
    console.log("Diary Year:", diaryYear);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.contentContainer}>
        <Box 
          component="h2" 
          sx={styles.heading}
        >
          Re-Assign Inspection Applications
        </Box>
      
      <Box sx={styles.formContainer}>
        <TextField
          label="Inspection Diary No."
          value={diaryNo}
          onChange={handleDiaryNoChange}
          sx={styles.inputField}
          fullWidth
        />
        
        <TextField
          label="Inspection Diary Year"
          value={diaryYear}
          onChange={handleDiaryYearChange}
          sx={styles.inputField}
          fullWidth
        />
        
        <Button
          variant={VARIANTS.CONTAINED}
          onClick={handleGetDetails}
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
