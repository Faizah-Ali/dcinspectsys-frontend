import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { selectStaffSchema, VARIANTS } from "../../common/constants";
import { showErrorToast } from "../../components/toast/helper";

import { STAFF_OPTIONS } from "./helper";
import { styles } from "./style";
import type { SelectStaffProps } from "./type";

const SelectStaff = ({
  diaryNo,
  diaryYr,
  onSubmit,
}: SelectStaffProps) => {
  const [staffId, setStaffId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await selectStaffSchema.validate(
        { staffId },
        { abortEarly: false }
      );

      onSubmit({
        staffId,
        remarks: remarks.trim(),
      });
    } catch (error: any) {
      showErrorToast(error?.message || "Please select a staff member");
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Box component="p" sx={styles.referenceText}>
        Reference No.-  {diaryNo}/{diaryYr}
      </Box>

      <RadioGroup
        value={staffId}
        onChange={(event) => setStaffId(event.target.value)}
        sx={styles.staffGroup}
      >
        {STAFF_OPTIONS.map((staff) => (
          <FormControlLabel
            key={staff.id}
            value={staff.id}
            control={<Radio />}
            label={staff.label}
          />
        ))}
      </RadioGroup>

      <Box sx={styles.remarksRow}>
        <Box component="label" htmlFor="staff-remarks" sx={styles.remarksLabel}>
          Remarks:
        </Box>

        <TextField
          id="staff-remarks"
          multiline
          minRows={6}
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
          sx={styles.remarksField}
        />
      </Box>

      <Box sx={styles.submitButtonWrap}>
        <Button
          type="submit"
          variant={VARIANTS.CONTAINED}
          disabled={isSubmitting}
          sx={styles.submitButton}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default SelectStaff;
