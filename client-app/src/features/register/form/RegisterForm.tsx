import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectFormValues } from "../../../app/models/project";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { RegisterFormValues } from "../../../app/models/register";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";

export default observer(function RegisterForm() {
  const { registerStore, bookmakerStore, eventStore, sellerStore } = useStore();
  const { createRegister, updateRegister, loadRegister, loadingInitial } =
    registerStore;

  const { loadBookmakers, allBookmakers } = bookmakerStore;
  const { loadEvents, allEvents } = eventStore;
  const { loadSellers, allSellers } = sellerStore;

  const { id } = useParams();
  const navigate = useNavigate();
  const [register, setRegister] = useState<RegisterFormValues>(
    new RegisterFormValues()
  );

  const validationSchema = Yup.object({
    registerDate: Yup.date().required("The register date is required"),
    registerTotal: Yup.number().required("The register total is required"),
    registerAmount: Yup.number().required("The register amount is required"),
    eventsId: Yup.string().required("The event is required"),
    sellerId: Yup.string().required("The seller is required"),
    bookmakerId: Yup.string().required("The bookmaker is required"),
  });

  useEffect(() => {
    // loadBookmakers();
    // loadEvents();
    loadSellers();
    if (id)
      loadRegister(id).then((register) =>
        setRegister(new RegisterFormValues(register))
      );
  }, [id, loadRegister, loadBookmakers, loadEvents, loadSellers]);

  function handleFormSubmit(register: RegisterFormValues) {
    if (!register.registerId) {
      let newRegister = {
        ...register,
        registerId: uuid(),
      };
      createRegister(newRegister).then(() => {
        navigate(`/register`);
        window.location.reload();
      });
    } else {
      updateRegister({
        ...register,
      }).then(() => navigate(`/register`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading register..." />;

  return (
    <Segment clearing>
      <Header content="Register Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={register}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="registerDate" placeholder="Register Date" />
            <MyTextInput name="registerTotal" placeholder="Register Total" />
            <MyTextInput name="registerAmount" placeholder="Register Amount" />

            <MySelectInput
              options={allEvents.map((event) => ({
                text: event.eventName,
                value: event.eventsId,
              }))}
              placeholder="Event"
              name="eventsId"
            />
            <MySelectInput
              options={allSellers.map((seller) => ({
                text: seller.sellerName,
                value: seller.sellerId,
              }))}
              placeholder="Seller"
              name="sellerId"
            />
            <MySelectInput
              options={allBookmakers.map((bookMaker) => ({
                text: bookMaker.bookmakerName,
                value: bookMaker.bookmakerId,
              }))}
              placeholder="Bookmaker"
              name="bookmakerId"
            />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/register"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
