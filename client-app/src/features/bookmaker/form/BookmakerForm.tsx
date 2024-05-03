import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { BookmakerFormValues } from "../../../app/models/bookmaker";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function BookmakerForm() {
  const { bookmakerStore } = useStore();
  const { createBookmaker, updateBookmaker, loadBookmaker, loadingInitial } = bookmakerStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookmaker, setBookmaker] = useState<BookmakerFormValues>(
    new BookmakerFormValues()
  );
  const validationSchema = Yup.object({
    bookmakerName: Yup.string().required("The bookmaker name is required"),
  });
  useEffect(() => {
    if (id) {
      loadBookmaker(id).then((bookmaker) => 
        setBookmaker(new BookmakerFormValues(bookmaker)));
    }
  }, [id, loadBookmaker]);

  function handleBookmakerSubmit(bookmaker: BookmakerFormValues) {
    if (!bookmaker.bookmakerId) {
      let newBookmaker = {
        ...bookmaker,
        bookmakerId: uuid(),
      };
      createBookmaker(newBookmaker).then(() => {
        navigate(`/bookmakers`);
        // window.location.reload();
      });
    } else {
      updateBookmaker(bookmaker).then(() => {
        navigate(`/bookmakers`);
        // window.location.reload();
      });
    }
  }

  if(loadingInitial) return <h1>Loading...</h1>;

  return (
    <Segment clearing>
      <Header content='Bookmaker Details' sub color='teal' />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={bookmaker}
        onSubmit={(values) => handleBookmakerSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='bookmakerName' placeholder='Nome da Casa de aposta' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              as={Link}
              to='/bookmakers'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});