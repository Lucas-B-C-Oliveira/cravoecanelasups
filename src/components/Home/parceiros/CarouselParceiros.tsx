import { queryAdmin } from "@/utils/shopify/adminApi";
import { ImageCarousel } from "./ImageCarouselParceiros";
import { queryMetaObjectByType } from "@/utils/graphql/querys";
import { CarouselContainerParceiros } from "./CarouselContainerParceiros";

export async function CarouselParceiros() {
  const { metaobjectDefinitionByType } = await queryAdmin(
    queryMetaObjectByType("carrossel_parceiros")
  );
  const { metaobjects } = metaobjectDefinitionByType;
  const [imagesData, altsData] = metaobjects.nodes[0].fields;

  const images = imagesData.references.nodes.map(
    (references: any) => references.image.url
  );

  return <CarouselContainerParceiros images={images} />;
}
