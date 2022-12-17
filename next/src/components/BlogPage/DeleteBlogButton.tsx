import React from "react";
import { useRouter } from "next/router";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BlogApi } from "@/entities/Blog";

type Props = {
  id: number;
};

export const DeleteBlogButton = ({ id }: Props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    await BlogApi.delete(id).then((res) => console.log(res));
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <LoadingButton
        variant="contained"
        color="secondary"
        sx={{ ml: 2 }}
        loading={isLoading}
        onClick={handleClickOpen}
      >
        delete
      </LoadingButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>本当にこの記事を削除してもよいですか？</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            キャンセル
          </Button>
          <Button onClick={handleDelete} color="warning">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
