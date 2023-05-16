import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../AdminComponents/axios-utils";
import { Watch } from "react-loader-spinner";
import { Grid, Typography } from "@mui/material";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { token, url } = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    makeRequest();
  }, []);
  async function makeRequest() {
    try {
      let res = await instance(`/${url}/mailconfirmation/${token}`);
      if (!res) throw new Error("error");
      setResult(true);
    } catch (e) {
      setResult(false);
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }
  return (
    <Grid>
      {isLoading && (
        <Grid sx={{ position: "fixed", left: "40%", marginTop: "20%" }}>
          <Grid>
            <Typography sx={{ "font-size": "4rem" }}>Загрузка...</Typography>
            <Watch
              height="200"
              width="200"
              radius="48"
              color="#4fa94d"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </Grid>
        </Grid>
      )}
      {result && (
        <Grid sx={{ position: "fixed", left: "40%", marginTop: "20%" }}>
          <Grid>
            <Typography sx={{ "font-size": "4rem", alignContent: "center" }}>
              Успех!
            </Typography>
            <ThumbUpAltTwoToneIcon sx={{ "font-size": "15rem" }} />
          </Grid>
        </Grid>
      )}
      {result === false && (
        <Grid sx={{ position: "fixed", left: "40%", marginTop: "20%" }}>
          <Grid>
            <Typography sx={{ "font-size": "4rem" }}>Ошибка!</Typography>
            <ReportTwoToneIcon sx={{ "font-size": "15rem" }} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ConfirmationPage;
