import { observer } from "mobx-react-lite";
import { SalePerformanceTeam } from "../../../../app/models/salePerformanceTeam";
import { Card, Feed, FeedEvent, Icon } from "semantic-ui-react";

interface Props {
  sale: SalePerformanceTeam
}

export default observer(function RankSPTByTotalSalesListItem({sale}: Props) {
  return(
    <>
      <Card style={{width: '100%'}}>
        <Card.Content>
          <Feed>
            <FeedEvent>
              <Feed.Content>
                <Feed.Summary>
                  {sale.sptSellerName}
                </Feed.Summary>
                <br />
                <Feed.Date>
                  <Icon name="currency" />{sale.sptTotalSalesAmont.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                </Feed.Date>
              </Feed.Content>
            </FeedEvent>
          </Feed>
        </Card.Content>
      </Card>
    </>
  )
});