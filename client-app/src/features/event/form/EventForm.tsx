import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OriginEventFormValues } from "../../../app/models/originEvent";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Formik } from "formik";

export default observer(function EventForm() {
  const { eventStore } = useStore();
  const { createEvent, updateEvent, loadEvent, loadingInitial } = eventStore;
  const { id } = useParams();
  const  navigate = useNavigate();
  const [event, setEvent] = useState<OriginEventFormValues>(
    new OriginEventFormValues()
  );
  const validationSchema = Yup.object({
    eventName: Yup.string().required("The event name is required"),
  });

  useEffect(() => {
    if (id) {
      loadEvent(id).then((event) => 
        setEvent(new OriginEventFormValues(event)));
    }
  }, [id, loadEvent]);

  function handleEventSubmit(event: OriginEventFormValues) {
    if (!event.eventsId) {
      let newEvent = {
        ...event,
        eventsId: uuid(),
      };
      createEvent(newEvent).then(() => {
        navigate(`/events`);
        // window.location.reload();
      });
    } else {
      updateEvent(event).then(() => {
        navigate(`/events`);
        // window.location.reload();
      });
    }
  }

  if(loadingInitial) return <h1>Loading...</h1>;

  return (
    <Segment clearing>
      <Header content='Event Details' sub color='teal' />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={event}
        onSubmit={(values) => handleEventSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='eventName' placeholder='Event Name' />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              floated='right'
              type='submit'
              positive
              content='Submit'
            />
            <Button
              as={Link}
              to='/events'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
})