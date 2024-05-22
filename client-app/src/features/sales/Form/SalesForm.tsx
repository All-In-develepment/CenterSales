import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { SaleFormValues } from "../../../app/models/sale";

export default observer(function SalesForm() {
  const { saleStore, projectStore, sellerStore, productStore } = useStore();
  const { createSale, updateSale, loadSales, loadingInitial } = saleStore;

  const { loadSellers, allSellers } = sellerStore;

  const { loadProjects, allProjects } = projectStore;

  const { loadProducts, allProducts } = productStore;

  const navigate = useNavigate();

  const sale = new SaleFormValues();

  const validationSchema = Yup.object({
    projectId: Yup.string().required("The project name is required"),
    productId: Yup.string().required("The Product name is required"),
    sellerId: Yup.string().required("The seller name is required"),
    salePrice: Yup.string().required("The sale price is required"),
  });

  useEffect(() => {
    loadProjects();
    loadSellers();
    loadSales();
    loadProducts();
  }, [loadSales, loadProjects, loadSellers, loadProducts]);

  function handleSellerSubmit(sale: SaleFormValues) {
    if (!sale.saleId) {
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 19);

      let newSale = {
        ...sale,
        saleDate: formattedDate,
        saleId: uuid(),
      };

      createSale(newSale).then(() => {
        navigate(`/sales`);
        // window.location.reload();
      });
    } else {
      updateSale(sale).then(() => {
        navigate(`/sales`);
        window.location.reload();
      });
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading project..." />;

  return (
    <Segment clearing>
      <Header content="Sales Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={sale}
        onSubmit={(values) => handleSellerSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MySelectInput
              options={allSellers.map((seller) => ({
                text: seller.sellerName,
                value: seller.sellerId,
              }))}
              placeholder="Seller Name"
              name="sellerId"
            />

            <MySelectInput
              options={allProjects.map((project) => ({
                text: project.projectName,
                value: project.projectId,
              }))}
              placeholder="Project Name"
              name="projectId"
            />

            <MySelectInput
              options={allProducts.map((product) => ({
                text: product.productName,
                value: product.productId,
              }))}
              placeholder="Product Name"
              name="productId"
            />

            <MyTextInput name="salePrice" placeholder="Sale Price" />

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
              to="/sales"
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
