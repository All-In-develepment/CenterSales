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
import MyTextArea from "../../../app/common/form/MyTextArea";
import { ProductFormValues } from "../../../app/models/product";

export default observer(function ProductForm() {
  const { productStore } = useStore();
  const { createProduct, updateProduct, loadProduct, loadingInitial } =
    productStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductFormValues>(
    new ProductFormValues()
  );

  const validationSchema = Yup.object({
    productName: Yup.string().required("The product name is required"),
    productIsActive: Yup.boolean().required("The seller product is required"),
  });

  useEffect(() => {
    if (id) {
      loadProduct(id).then((product) =>
        setProduct(new ProductFormValues(product))
      );
    }
  }, [id, loadProduct]);

  function handleProductSubmit(product: ProductFormValues) {
    if (!product.productId) {
      let newProduct = {
        ...product,
        productIsActive:
          product.productIsActive === true ? product.productIsActive : false,
        productId: uuid(),
      };

      createProduct(newProduct).then(() => {
        navigate(`/products`);
        window.location.reload();
      });
    } else {
      updateProduct({
        ...product,
        productIsActive:
          product.productIsActive === true ? product.productIsActive : false,
      }).then(() => {
        navigate(`/products`);
        window.location.reload();
      });
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading project..." />;

  return (
    <Segment clearing>
      <Header content="Product Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={product}
        onSubmit={(values) => handleProductSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="productName" placeholder="Product Name" />

            <MyTextArea
              rows={3}
              placeholder="Product Description"
              name="productDescription"
            />

            <MyTextInput name="productPrice" placeholder="Product Price" />

            <MySelectInput
              options={[
                { text: "Active", value: true },
                { text: "Inactive", value: "false" },
              ]}
              placeholder="Product Status"
              name="productIsActive"
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
              to="/products"
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
