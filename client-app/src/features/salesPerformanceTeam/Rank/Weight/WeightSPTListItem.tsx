// import { observer } from "mobx-react-lite";
// import { SalePerformanceTeam } from "../../../../app/models/salePerformanceTeam";
// import { Card, Feed, FeedEvent, Icon } from "semantic-ui-react";
// import { styled, Paper, CardContent, Box, Typography } from '@mui/material';
// import Grid from 'import Grid from "@mui/material/Grid2";
// import HowToVoteIcon from '@mui/icons-material/HowToVote';
// import PercentIcon from '@mui/icons-material/Percent';
// import GroupsIcon from '@mui/icons-material/Groups';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// import PriceCheckIcon from '@mui/icons-material/PriceCheck';

// interface Props {
//   sale: SalePerformanceTeam
// }

// export default observer(function RankSPTByDepositListItem({sale}: Props) {
//   const Item = styled(Paper)(({}) => ({
//     backgorundColor: 'red',
//     textAlign: 'center',
//     margin: '10px',
//   }));

//   return(
//     <Item>
//       <Card style={{width: '100%'}}>
//         <CardContent>
//           <Box sx={{ flexGrow: 1 }}>
//             <Grid
//               container
//               rowSpacing={2}
//               spacing={{ xs: 1, sm: 2, md: 3 }}
//               justifyContent="space-evenly"
//               alignItems="center"
//             >
//               <Typography variant="h5" gutterBottom>
//                 {sale.sptSellerName}
//               </Typography>
//             </Grid>
//             <br />
//             <Grid
//               container
//               rowSpacing={2}
//               spacing={{ xs: 1, sm: 2, md: 3 }}
//               justifyContent="space-evenly"
//               alignItems="center"
//             >
//               <Typography variant="h5" color="text.secondary" gutterBottom>
//                 <Icon name="dollar" />{(sale.sptTotalRegisterAmont + sale.sptTotalRedepositAmont).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
//               </Typography>
//             </Grid>
//             <br />
//           </Box>

//           <Box sx={{ flexGrow: 1 }}>
//             <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-evenly" alignItems="center">
//               <Grid>
//                 <GroupsIcon name="group" />{sale.sptTotalLeads} {sale.sptTotalLeads > 1 ? 'Leads' : 'Lead'}
//               </Grid>
//               <Grid>
//                 <PointOfSaleIcon name="chart line" />{sale.sptTotalSales} {sale.sptTotalSales > 1 ? 'Vendas' : 'Venda'}
//               </Grid>
//               <Grid>
//                 <LocalAtmIcon name="money bill alternate outline" />R$ {sale.sptTotalSalesAmont.toFixed(2)}
//               </Grid>
//               <Grid>
//                 <HowToVoteIcon />{sale.sptTotalRedeposit + sale.sptTotalRegister} {(sale.sptTotalRedeposit  + sale.sptTotalRegister) > 1 ? 'Depositos' : 'Deposito'}
//               </Grid>
//               <Grid>
//                 <PriceCheckIcon />{(sale.sptTotalRedepositAmont + sale.sptTotalRedepositAmont).toFixed(2)}
//               </Grid>
//             </Grid>
//           </Box>
//         </CardContent>
//       </Card>
//     </Item>
//   )
// });
