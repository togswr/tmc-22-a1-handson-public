import { Grid, Paper, Typography } from "@mui/material";

export const NoBlogs = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: "70vh" }}
    >
      <Paper sx={{ textAlign: "center", mt: 3, mb: 3, p: 5 }}>
        <Typography variant="h1" gutterBottom>
          まだブログはありません...
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          ブログ編集者は、ログイン後、右上の「CREATE NEW
          BLOG」ボタンからブログを作成してください！
        </Typography>
        <Typography sx={{ fontSize: "1.2rem" }}>
          その他のユーザーは、ブログが投稿されるまで今しばらくお待ちください...
        </Typography>
      </Paper>
    </Grid>
  );
};
