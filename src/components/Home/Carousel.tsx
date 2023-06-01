import { queryAdmin } from '@/utils/shopify/adminApi'
import { ImageCarousel } from './ImageCarousel'
import { queryMetaObjectByType } from '@/utils/graphql/querys'
import { CarouselContainer } from './CarouselContainer'

export async function Carousel() {
  const { metaobjectDefinitionByType } = await queryAdmin(
    queryMetaObjectByType('carrossel_home'),
  )

  const { metaobjects } = metaobjectDefinitionByType
  const [imagesData, altsData] = metaobjects.nodes[0].fields

  const images = imagesData.references.nodes.map(
    (references: any) => references.image.url,
  )

  const alts = JSON.parse(altsData.value)

  return <CarouselContainer images={images} alts={alts} />
}
