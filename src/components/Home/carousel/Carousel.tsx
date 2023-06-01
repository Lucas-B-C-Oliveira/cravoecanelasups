import { queryAdmin } from "@/utils/shopify/adminApi";
import { ImageCarousel } from "./ImageCarousel";
import { queryMetaObjectByType } from "@/utils/graphql/querys";
import { CarouselContainer } from "./CarouselContainer";

export async function Carousel() {
  const { metaobjectDefinitionByType } = await queryAdmin(
    queryMetaObjectByType("carrossel_home")
  );
  const { metaobjectDefinitionByType: metaobjectDefinitionByTypeMobile } =
    await queryAdmin(queryMetaObjectByType("carrossel_mobile"));

  const [imagesData, altsData] =
    metaobjectDefinitionByType.metaobjects.nodes[0].fields;
  const [imagesDataMobile, altsDataMobile] =
    metaobjectDefinitionByTypeMobile.metaobjects.nodes[0].fields;

  const images = imagesData.references.nodes.map(
    (references: any) => references.image.url
  );
  const imagesMobile = imagesDataMobile.references.nodes.map(
    (references: any) => references.image.url
  );

  const alts = JSON.parse(altsData.value);
  return (
    <CarouselContainer
      images={images}
      alts={alts}
      imagesMobile={imagesMobile}
    />
  );
}
