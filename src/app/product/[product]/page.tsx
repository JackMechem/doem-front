import { NextPage } from "next";

interface Props {
  props: {
    product: string;
  };
}

const ProductPage: NextPage<Props> = ({ props: product }) => {
  return <div>Product</div>;
};

export default ProductPage;
