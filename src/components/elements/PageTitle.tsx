import { Typography, TypographyProps } from "@mui/material";

const PageTitle = ({
  title,
  ...props
}: { title: string } & TypographyProps) => {
  return (
    <Typography variant="h3" component="h1" fontWeight={700} {...props}>
      {title}
    </Typography>
  );
};

export default PageTitle;
