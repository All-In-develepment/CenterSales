import { Card, Feed, FeedEvent, Icon } from "semantic-ui-react";
import { Register } from "../../../../app/models/register";

interface Props {
  register: Register;
};

export default function RankListItemBySeller({ register }: Props) {
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Feed>
            <FeedEvent>
              <Feed.Content>
                <Feed.Summary>
                  {register.sellerName}
                </Feed.Summary>
                <br />
                <Feed.Date>
                  <Icon name="currency" />{register.registerAVGConversion.toLocaleString('pt-br', { maximumFractionDigits: 2 })}
                  <p>{register.registerLeads}</p>
                  <p>{register.registerTotal}</p>
                </Feed.Date>
              </Feed.Content>
            </FeedEvent>
          </Feed>
        </Card.Content>
      </Card>
    </>
  );
}