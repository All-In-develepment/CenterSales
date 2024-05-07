import { observer } from "mobx-react-lite";
import { Sale } from "../../../app/models/sale";
import { Card, Feed, FeedEvent, Icon, Image } from "semantic-ui-react";

interface Props {
  sale: Sale
}

export default observer(function RankByProjectListItem({sale}: Props) {

  return(
    <>
      <Card style={{width: '100%'}}>
        <Card.Content>
          <Feed>
            <FeedEvent>
              <Feed.Content>
                <Feed.Summary>
                  {sale.projectName}
                </Feed.Summary>
                <br />
                <Feed.Date>
                  <Icon name="currency" />{sale.salePrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                </Feed.Date>
              </Feed.Content>
            </FeedEvent>
          </Feed>
        </Card.Content>
      </Card>
    </>
  )
});
