import { IDBTour } from "@/utils/interface/interfaceDatabase"
import GridHomeToursItem, { IGridHomeToursItem } from "../panels/GridHomeToursItem"
import GridHomeToursItemV2 from "../panels/GridHomeToursItemV2"
import { IThumbanilData } from "@/utils/interface/interfaceFrontEnd"


export default function GridHomeToursV2({ toursData }: {
  toursData: IThumbanilData[]
}) {
  return <section className="grid-home-tours grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {
      toursData.map((tourItem: IThumbanilData, key: number) => {
        return <GridHomeToursItemV2
          key={`tour-${tourItem.tour.id}`}
          tourData={tourItem}
        />
      })
    }
  </section>
}