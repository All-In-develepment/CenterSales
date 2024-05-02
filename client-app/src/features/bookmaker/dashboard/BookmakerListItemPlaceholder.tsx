import { Fragment } from "react/jsx-runtime";
import { Placeholder, PlaceholderHeader, PlaceholderLine, Segment } from "semantic-ui-react";

export default function BookmakerListItemPlaceholder() {
  return(
    <Fragment>
      <Placeholder fluid style={{ marginTop: 25 }}>
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Placeholder>
              <PlaceholderHeader>
                <PlaceholderLine />
                <PlaceholderLine />
              </PlaceholderHeader>
            </Placeholder>
          </Segment>
        </Segment.Group>
      </Placeholder>
    </Fragment>
  )
}