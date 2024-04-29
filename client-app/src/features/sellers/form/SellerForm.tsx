import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { SellerFormValues } from "../../../app/models/seller";

export default observer(function SellerForm() {
  const { sellerStore, projectStore } = useStore();
  const { createSeller, updateSeller, loadSeller, loadingInitial } =
    sellerStore;

  const { loadProjects, allProjects } = projectStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [seller, setSeller] = useState<SellerFormValues>(
    new SellerFormValues()
  );

  const validationSchema = Yup.object({
    projectId: Yup.string().required("The project name is required"),
    sellerName: Yup.string().required("The seller name is required"),
    // sellerIsActive: Yup.boolean().required("The seller status is required"),
  });

  useEffect(() => {
    loadProjects();
    if (id) {
      loadSeller(id).then((seller) => setSeller(new SellerFormValues(seller)));
    }
  }, [id, loadSeller, loadProjects]);

  function handleSellerSubmit(seller: SellerFormValues) {
    if (!seller.sellerId) {
      let newseller = {
        ...seller,
        sellerIsActive:
          seller.sellerIsActive === true ? seller.sellerIsActive : false,
        sellerId: uuid(),
      };

      createSeller(newseller).then(() => {
        navigate(`/sellers`);
        window.location.reload();
      });
    } else {
      updateSeller({
        ...seller,
        sellerIsActive:
          seller.sellerIsActive === true ? seller.sellerIsActive : false,
      }).then(() => {
        navigate(`/sellers`);
        window.location.reload();
      });
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading project..." />;

  return (
    <Segment clearing>
      <Header content="Seller Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={seller}
        onSubmit={(values) => handleSellerSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="sellerName" placeholder="Seller Name" />

            <MySelectInput
              options={allProjects.map((project) => ({
                text: project.projectName,
                value: project.projectId,
              }))}
              placeholder="Project Name"
              name="projectId"
            />

            <MySelectInput
              options={[
                { text: "Active", value: true },
                { text: "Inactive", value: "false" },
              ]}
              placeholder="Seller Status"
              name="sellerIsActive"
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
              disabled={isSubmitting}
              as={Link}
              to="/sellers"
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
