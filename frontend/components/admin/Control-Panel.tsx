import { Button, Stack } from "@mui/material";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ControlPanel = ({
  buttonText,
  postId,
}: {
  buttonText: string;
  postId?: string;
}) => {
  const router = useRouter();
  return (
    <div className="w-full shadow-xl p-5 rounded-md bg-slate-400">
      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            buttonText === "Saved" || buttonText === "Updated"
              ? router.back()
              : confirm("Exit without Saving?")
              ? router.back()
              : null
          }
        >
          EXIT
        </Button>

        {postId && (
          <Button
            type="link"
            href={`/post/${postId}`}
            target="_blank"
            size="small"
            color="primary"
            variant="contained"
          >
            VIEW POST
          </Button>
        )}

        <Button
          type="submit"
          size="small"
          color="info"
          startIcon={<SaveIcon />}
          variant="contained"
          disabled={
            buttonText === "Saved" || buttonText === "Updated" ? true : false
          }
        >
          {buttonText}
        </Button>
      </Stack>
    </div>
  );
};

export default ControlPanel;
