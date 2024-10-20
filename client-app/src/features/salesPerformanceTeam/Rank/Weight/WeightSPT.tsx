import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { Box, CardContent, Paper, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { observer } from "mobx-react-lite";
import { Card } from "semantic-ui-react";
import { IWeightedData } from "../RankDashboard";

interface Props {
  weight: IWeightedData;
}

export default observer(function WeightSPT({ weight }: Props) {
  const Item = styled(Paper)(({}) => ({
    backgorundColor: "red",
    textAlign: "center",
    margin: "10px",
  }));

  return (
    <>
      <Item>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                rowSpacing={2}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Typography variant="h5" gutterBottom>
                  {weight.projectName}
                </Typography>
              </Grid>
              <br />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Grid>
                  <PointOfSaleIcon name="chart line" />
                  {weight.salesValueWeight}{" "}
                  {weight.salesValueWeight > 1 ? "Vendas" : "Venda"}
                </Grid>
                <Grid>
                  <LocalAtmIcon name="money bill alternate outline" />
                  R$ {weight.registrationWeight.toFixed(2)}
                </Grid>
                <Grid>
                  <HowToVoteIcon />
                  {weight.depositWeight}{" "}
                  {weight.depositWeight > 1 ? "Depositos" : "Deposito"}
                </Grid>
                <Grid>
                  <PriceCheckIcon />
                  {weight.conversionWeight.toFixed(2)}
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Item>
    </>
  );
});
