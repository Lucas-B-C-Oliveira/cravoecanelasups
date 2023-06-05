import { ProductData } from "@/types";
import { Product } from "./Product";
import { query } from "@/utils/shopify/storefrontApi";
import { queryGetProductsByCollectionHandle } from "@/utils/graphql/querys";
import PaginatedItems from "./Pagination";

interface Props {
  collectionHandle: string;
}

export async function ProductsGrid({
  collectionHandle = "mais-vendidos",
}: Props) {
  const queryResult = await query(
    queryGetProductsByCollectionHandle(collectionHandle)
  );

  const { nodes } = queryResult.collection.products;

  // console.log('productsData', nodes)

  const products: ProductData[] = nodes.map((product: ProductData) => {
    const { url, altText } = product?.featuredImage;

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      currencyCode: product?.priceRange?.minVariantPrice.currencyCode,
      currencySymbol: "R$",
      altText: `${altText}`,
      image: url,
      variants: product.variants?.nodes,
      price: product?.priceRange?.minVariantPrice.amount,
      options: product.options,
    };
  });

  return <PaginatedItems products={products} itemsPerPage={30} />;
}
