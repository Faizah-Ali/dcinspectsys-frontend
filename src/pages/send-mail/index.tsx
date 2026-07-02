import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { styles } from "./style";
import { VARIANTS } from "../../common/constants";
import {
  handleFieldChange,
  handleResetForm,
  handleSendMail,
  initialSendMailForm,
  type SendMailFormData,
  type SendMailFormErrors,
  validateSendMailForm,
} from "./helper";

const SendMail = () => {
  const [formData, setFormData] = useState<SendMailFormData>(
    initialSendMailForm
  );
  const [errors, setErrors] = useState<SendMailFormErrors>({});

  const onSendMail = async () => {
    const validationErrors = await validateSendMailForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleSendMail(formData);
  };

  const onResetForm = () => {
    handleResetForm(setFormData, setErrors);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.contentContainer}>
        <Box component="h2" sx={styles.heading}>
          Send Mail
        </Box>

        <Box sx={styles.formContainer}>
          <TextField
            label="To Email"
            type="email"
            value={formData.toEmail}
            onChange={handleFieldChange(
              "toEmail",
              setFormData,
              errors,
              setErrors
            )}
            sx={styles.inputField}
            placeholder="Enter recipient email address"
            error={!!errors.toEmail}
            helperText={errors.toEmail}
            fullWidth
          />

          <TextField
            label="Subject"
            value={formData.subject}
            onChange={handleFieldChange(
              "subject",
              setFormData,
              errors,
              setErrors
            )}
            sx={styles.inputField}
            placeholder="Enter mail subject"
            error={!!errors.subject}
            helperText={errors.subject}
            fullWidth
          />

          <TextField
            label="Message"
            value={formData.message}
            onChange={handleFieldChange(
              "message",
              setFormData,
              errors,
              setErrors
            )}
            sx={styles.messageField}
            placeholder="Enter your message"
            error={!!errors.message}
            helperText={errors.message}
            fullWidth
            multiline
            minRows={6}
          />

          <Box sx={styles.actionButtons}>
            <Button
              variant={VARIANTS.CONTAINED}
              onClick={onSendMail}
              sx={styles.sendButton}
            >
              Send Mail
            </Button>

            <Button
              variant={VARIANTS.OUTLINED}
              onClick={onResetForm}
              sx={styles.resetButton}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SendMail;
